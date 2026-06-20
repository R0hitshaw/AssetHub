package com.asset.tracker.it_asset_management.dto.request;

import lombok.Data;

@Data
public class AllocationRequest {
    private Long assetId;
    private Long employeeId;
}
