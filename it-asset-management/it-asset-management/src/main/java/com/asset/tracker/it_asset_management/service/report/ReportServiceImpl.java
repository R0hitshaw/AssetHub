package com.asset.tracker.it_asset_management.service.report;

import com.asset.tracker.it_asset_management.dto.response.AssetResponse;
import com.asset.tracker.it_asset_management.mapper.AssetMapper;
import com.asset.tracker.it_asset_management.model.Asset;
import com.asset.tracker.it_asset_management.model.enums.AssetStatus;
import com.asset.tracker.it_asset_management.model.enums.AssetType;
import com.asset.tracker.it_asset_management.repository.AllocationRepository;
import com.asset.tracker.it_asset_management.repository.AssetRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{

    private final AssetRepository assetRepository;
    private final AllocationRepository allocationRepository;
    private final AssetMapper assetMapper;


    @Override
    public Map<AssetStatus, Long> getAssetCountByStatus() {
        return assetRepository.countAssetsByStatus()
                .stream()
                .collect(Collectors.toMap(
                        e-> (AssetStatus) e[0],
                        e-> (Long) e[1]
                ));
    }

    @Override
    public Map<AssetType, Long> getAssetCountByType() {
        return assetRepository.countAssetsByType()
                .stream()
                .collect(Collectors.toMap(
                        e-> (AssetType) e[0],
                        e-> (Long) e[1]
                ));
    }

    @Override
    public Map<String, Long> getAssetCountByDepartment() {
        return assetRepository.countAssetsByDepartment()
                .stream()
                .collect(Collectors.toMap(
                        e-> (String) e[0],
                        e-> (Long) e[1]
                ));
    }

    @Override
    public List<AssetResponse> getWarrantyExpiringAssets(int days, int page, int size) {
        Pageable pageable = PageRequest.of(page,size, Sort.by("warrantyExpiry").ascending());
        LocalDate limit = LocalDate.now().plusDays(days);
        Page<Asset> pages = assetRepository.findAssetsExpiringBefore(limit,pageable);
        return pages.
                getContent()
                .stream()
                .map(assetMapper::toResponseDTO)
                .toList();
    }

    @Override
    public Map<Long, Long> getAssetCountByEmployee() {
        return allocationRepository.countAssetsByEmployee()
                .stream()
                .collect(Collectors.toMap(
                        e-> (Long) e[0],
                        e-> (Long) e[1]
                ));
    }
}
