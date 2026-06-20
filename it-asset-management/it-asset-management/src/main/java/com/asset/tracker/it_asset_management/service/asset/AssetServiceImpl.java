package com.asset.tracker.it_asset_management.service.asset;

import com.asset.tracker.it_asset_management.dto.request.AssetRequest;
import com.asset.tracker.it_asset_management.dto.response.AssetResponse;
import com.asset.tracker.it_asset_management.exception.ResourceNotFoundException;
import com.asset.tracker.it_asset_management.mapper.AssetMapper;
import com.asset.tracker.it_asset_management.model.Asset;
import com.asset.tracker.it_asset_management.model.User;
import com.asset.tracker.it_asset_management.model.enums.AssetStatus;
import com.asset.tracker.it_asset_management.model.enums.AssetType;
import com.asset.tracker.it_asset_management.model.enums.Role;
import com.asset.tracker.it_asset_management.repository.AssetRepository;
import com.asset.tracker.it_asset_management.repository.UserRepository;
import com.asset.tracker.it_asset_management.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AssetServiceImpl implements AssetService{

    private final AssetRepository assetRepository;
    private final UserService userService;
    private final AssetMapper assetMapper;



    @Override
    public AssetResponse addAsset(AssetRequest assetRequest) {
        if(!userService.isAdmin() && !userService.isITStaff())
        {
            throw new AccessDeniedException("User not Authorized to add assets");
        }
        if(assetRequest.getWarrantyExpiry().isBefore(assetRequest.getPurchaseDate()))
        {
            throw new IllegalArgumentException("Warranty expiry cannot be before purchase date.");
        }
        Asset asset = assetMapper.toEntity(assetRequest);
        asset.setAssetTag(generateAssetTag(assetRequest));
        asset = assetRepository.save(asset);
        return assetMapper.toResponseDTO(asset);
    }


    @PreAuthorize("""
    hasAnyRole('ADMIN','IT_STAFF')
    or @assetSecurity.isOwner(#id)
""")
    @Override
    public AssetResponse getAssetById(Long id) {
        Asset asset= assetRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Asset not found with id "+ id));
        return assetMapper.toResponseDTO(asset);
    }

    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF','EMPLOYEE')")
    @Override
    public List<AssetResponse> getAllAssets(int page, int size) {

        Pageable pageable = PageRequest.of(page,size, Sort.by("id").descending());
        User user = userService.getCurrentUser();

        Page<Asset> assets;

        if (user.getRole() == Role.EMPLOYEE) {
            assets = assetRepository.findByAssignedEmployee(user,pageable);
        } else {
            assets = assetRepository.findAll(pageable);
        }

        return assets.getContent()
                .stream()
                .map(assetMapper::toResponseDTO)
                .toList();
    }


    @Override
    public List<AssetResponse> getAvailableAssets(int page, int size) {
        Pageable pageable = PageRequest.of(page,size, Sort.by("id").descending());
        Page<Asset> assets = assetRepository.findByStatus(AssetStatus.AVAILABLE,pageable);
        return assets.getContent()
                .stream()
                .map(assetMapper::toResponseDTO)
                .toList();
    }

    @Override
    public List<AssetResponse> getAssetsByType(AssetType type, int page, int size) {
        Pageable pageable = PageRequest.of(page,size, Sort.by("id").descending());
        Page<Asset> assets = assetRepository.findByType(type,pageable);
        return assets.getContent()
                .stream()
                .map(assetMapper::toResponseDTO)
                .toList();
    }

    @Override
    @Caching(evict = {
            @CacheEvict(value = "assetDescriptions", key = "#id"),
            @CacheEvict(value = "adminReports", key = "'latest'")
    })
    public AssetResponse updateAsset(Long id, AssetRequest assetRequest) {
        if(!userService.isAdmin() && !userService.isITStaff())
        {
            throw new AccessDeniedException("Not Authorized");
        }

        Asset existing = assetRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Asset not found with id: " + id));

        if(existing.getStatus()==AssetStatus.RETIRED)
        {
            throw new IllegalStateException("Cannot update retired asset.");
        }
        existing.setBrand(assetRequest.getBrand());
        existing.setModel(assetRequest.getModel());
        existing.setAssignedDepartment(assetRequest.getAssignedDepartment());

        Asset saved = assetRepository.save(existing);

        return assetMapper.toResponseDTO(saved);
    }


    @Override
    @Caching(evict = {
            @CacheEvict(value = "assetDescriptions", key = "#id"),
            @CacheEvict(value = "adminReports", key = "'latest'")
    })
    public AssetResponse updateAssetStatus(Long id, AssetStatus status) {
        if(!userService.isAdmin() && !userService.isITStaff())
        {
            throw new AccessDeniedException("Not Authorized.");
        }
        Asset asset = assetRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Asset not found with id: " + id));
        validateStatusTransition(asset.getStatus(),status);
        asset.setStatus(status);
        Asset saved = assetRepository.save(asset);
        return assetMapper.toResponseDTO(saved);
    }
    @Override
    @Caching(evict = {
            @CacheEvict(value = "assetDescriptions", key = "#id"),
            @CacheEvict(value = "adminReports", key = "'latest'")
    })
    public void retireAsset(Long id) {
        if(!userService.isAdmin())
        {
            throw new AccessDeniedException("Only admin can retire asset");
        }
        Asset asset = assetRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Asset not found with id: " + id));
        asset.setStatus(AssetStatus.RETIRED);
        assetRepository.save(asset);

    }

    private void validateStatusTransition(AssetStatus current, AssetStatus status1) {
        if(current == AssetStatus.RETIRED)
        {
            throw new IllegalStateException("Retired asset cannot be changed");
        }
        if(current==AssetStatus.ASSIGNED && status1== AssetStatus.AVAILABLE)
        {
            return;
        }
        if(current==AssetStatus.AVAILABLE && status1==AssetStatus.ASSIGNED || status1 ==AssetStatus.UNDER_MAINTENANCE || status1== AssetStatus.RETIRED)
        {
            return;
        }
        if(current==AssetStatus.UNDER_MAINTENANCE && status1==AssetStatus.AVAILABLE)
        {
            return;
        }

        throw new IllegalStateException("Invalid Status Transition"+current+"->"+status1);
    }

    @Override
    public Asset getAssetEntity(Long id) {
        return assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found: " + id));
    }

    private String generateAssetTag(AssetRequest req) {
        String prefix = req.getType().name().substring(0, 3);   // LAP, MON, etc
        String year = String.valueOf(Year.now().getValue());

        long seq = assetRepository.count() + 1;

        return String.format("%s-%s-%06d", prefix, year, seq);
    }




}
