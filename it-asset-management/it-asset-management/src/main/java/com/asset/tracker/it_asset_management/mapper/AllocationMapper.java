package com.asset.tracker.it_asset_management.mapper;


import com.asset.tracker.it_asset_management.dto.response.AllocationResponse;
import com.asset.tracker.it_asset_management.model.Allocation;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AllocationMapper {
    public AllocationResponse toDTO(Allocation allocation)
    {
        return AllocationResponse.builder()
                .id(allocation.getId())
                .assetId(allocation.getAsset().getId())
                .assetTag(allocation.getAsset().getAssetTag())
                .employeeId(allocation.getEmployee().getId())
                .employeeName(allocation.getEmployee().getName())
                .assignedDate(allocation.getAssignedDate())
                .returnedDate(allocation.getReturnedDate())
                .assignedBy(allocation.getAssignedBy())
                .build();

    }
    public List<AllocationResponse> toDTOList(List<Allocation> allocations)
    {
        return allocations.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }


}
