package com.asset.tracker.it_asset_management.mapper;

import com.asset.tracker.it_asset_management.dto.request.AssetRequest;
import com.asset.tracker.it_asset_management.dto.response.ApiResponse;
import com.asset.tracker.it_asset_management.dto.response.AssetResponse;
import com.asset.tracker.it_asset_management.model.Asset;
import com.asset.tracker.it_asset_management.model.Employee;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AssetMapper {

    public Asset toEntity(AssetRequest dto) {
        Asset asset = new Asset();
        asset.setBrand(dto.getBrand());
        asset.setModel(dto.getModel());
        asset.setType(dto.getType());
        asset.setStatus(dto.getStatus());
        asset.setPurchaseDate(dto.getPurchaseDate());
        asset.setWarrantyExpiry(dto.getWarrantyExpiry());
        asset.setAssignedDepartment(dto.getAssignedDepartment());
        // assetTag typically auto-generated in service
        return asset;
    }

    public AssetResponse toResponseDTO(Asset entity) {
        AssetResponse dto = new AssetResponse();
        dto.setId(entity.getId());
        dto.setAssetTag(entity.getAssetTag());
        dto.setBrand(entity.getBrand());
        dto.setModel(entity.getModel());
        dto.setType(entity.getType());
        dto.setStatus(entity.getStatus());
        dto.setPurchaseDate(entity.getPurchaseDate());
        dto.setWarrantyExpiry(entity.getWarrantyExpiry());
        dto.setAssignedDepartment(entity.getAssignedDepartment());

        // Handle assigned employee safely
        if (entity.getAssignedEmployee() != null) {
            dto.setAssignedEmployeeId(entity.getAssignedEmployee().getId());
            dto.setAssignedEmployeeName(entity.getAssignedEmployee().getName()); // Adjust field name
        }
        return dto;
    }

    public List<AssetResponse> toResponseDTOList(List<Asset> entities) {
        return entities.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public void updateEntityFromDTO(AssetRequest dto, Asset entity) {
        entity.setBrand(dto.getBrand());
        entity.setModel(dto.getModel());
        entity.setType(dto.getType());
        entity.setStatus(dto.getStatus());
        entity.setPurchaseDate(dto.getPurchaseDate());
        entity.setWarrantyExpiry(dto.getWarrantyExpiry());
        entity.setAssignedDepartment(dto.getAssignedDepartment());
    }

}
