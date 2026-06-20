package com.asset.tracker.it_asset_management.dto.response;

import com.asset.tracker.it_asset_management.model.enums.AssetType;
import com.asset.tracker.it_asset_management.model.enums.AssetStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AssetResponse {

    private Long id;

    private String assetTag;
    private String brand;
    private String model;
    private AssetType type;
    private AssetStatus status;
    private LocalDate purchaseDate;
    private LocalDate warrantyExpiry;
    private String assignedDepartment;

    private Long assignedEmployeeId;
    private String assignedEmployeeName;
}

