package com.asset.tracker.it_asset_management.dto.request;

import com.asset.tracker.it_asset_management.model.enums.AssetType;
import com.asset.tracker.it_asset_management.model.enums.AssetStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AssetRequest {


    @NotBlank
    private String brand;

    @NotBlank
    private String model;

    @NotNull
    private AssetType type;

    @NotNull
    private AssetStatus status;

    @NotNull
    private LocalDate purchaseDate;

    @NotNull
    private LocalDate warrantyExpiry;

    private String assignedDepartment;

}
