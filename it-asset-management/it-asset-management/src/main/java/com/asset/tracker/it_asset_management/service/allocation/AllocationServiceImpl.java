package com.asset.tracker.it_asset_management.service.allocation;

import com.asset.tracker.it_asset_management.dto.response.AllocationResponse;
import com.asset.tracker.it_asset_management.exception.ResourceNotFoundException;
import com.asset.tracker.it_asset_management.mapper.AllocationMapper;
import com.asset.tracker.it_asset_management.mapper.EmployeeMapper;
import com.asset.tracker.it_asset_management.model.Allocation;
import com.asset.tracker.it_asset_management.model.Asset;
import com.asset.tracker.it_asset_management.model.Employee;
import com.asset.tracker.it_asset_management.model.enums.AssetStatus;
import com.asset.tracker.it_asset_management.repository.AllocationRepository;
import com.asset.tracker.it_asset_management.repository.AssetRepository;
import com.asset.tracker.it_asset_management.service.asset.AssetService;
import com.asset.tracker.it_asset_management.service.employee.EmployeeService;
import com.asset.tracker.it_asset_management.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class AllocationServiceImpl implements AllocationService {

    private final AllocationRepository allocationRepository;
    private final UserService userService;
    private final EmployeeService employeeService;
    private final AssetService assetService;
    private  final AllocationMapper allocationMapper;


    @Override
    public AllocationResponse assignAsset(Long assetId, Long employeeId) {
        if(!userService.isAdmin() && !userService.isITStaff())
        {
            throw  new AccessDeniedException("Not Authorized to assign assets.");
        }
        Asset asset = assetService.getAssetEntity(assetId);
        Employee employee=employeeService.getEmployeeEntity(employeeId);


        if(asset.getStatus()!= AssetStatus.AVAILABLE)
        {
            throw new IllegalStateException("Asset not available for assignment.");
        }
        allocationRepository.findByAssetIdAndReturnedDateIsNull(assetId).ifPresent(a ->{
            throw new IllegalStateException("Asset already Assigned.");
        });
        Allocation allocation= Allocation.builder()
                        .asset(asset).employee(employee).assignedDate(LocalDate.now())
                        .assignedBy(userService.getCurrentUsername())
                                .build();

        assetService.updateAssetStatus(assetId, AssetStatus.ASSIGNED);
        allocation = allocationRepository.save(allocation);
        return allocationMapper.toDTO(allocation);
    }

    @Override
    public AllocationResponse returnAsset(Long assetId) {
        if(!userService.isAdmin() && !userService.isITStaff())
        {
            throw new AccessDeniedException("Not Authorized to return asset.");
        }
        Allocation allocation=allocationRepository.findByAssetIdAndReturnedDateIsNull(assetId).orElseThrow
                (()->new RuntimeException("No Active allocation found."));

        allocation.setReturnedDate(LocalDate.now());

        assetService.updateAssetStatus(assetId, AssetStatus.AVAILABLE);
        allocation = allocationRepository.save(allocation);

    return allocationMapper.toDTO(allocation);

    }

    @Override
    @PreAuthorize("""
    hasAnyRole('ADMIN','IT_STAFF')
    or @employeeSecurity.isOwner(#id)
""")
    public List<AllocationResponse> getAssetsByEmployee(Long employeeId, int page, int size) {
        Pageable pageable = PageRequest.of(page,size, Sort.by("id").descending());
        Page<Allocation> allocations =allocationRepository.findByEmployeeId(employeeId,pageable);
        return allocations.getContent()
                .stream()
                .map(allocationMapper::toDTO)
                .toList();
    }


    @Override
    @PreAuthorize("""
    hasAnyRole('ADMIN','IT_STAFF')
    or @assetSecurity.isOwner(#id)
""")
    public List<AllocationResponse> getAllocationHistory(Long assetId, int page,int  size) {
        Pageable pageable = PageRequest.of(page,size, Sort.by("id").descending());
        Page<Allocation> allocations = allocationRepository.findByAssetId(assetId,pageable);
        return allocations.getContent()
                .stream()
                .map(allocationMapper::toDTO)
                .toList();
    }
}
