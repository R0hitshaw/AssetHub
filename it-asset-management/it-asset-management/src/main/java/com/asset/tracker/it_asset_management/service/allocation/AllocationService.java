package com.asset.tracker.it_asset_management.service.allocation;

import com.asset.tracker.it_asset_management.dto.response.AllocationResponse;
import com.asset.tracker.it_asset_management.model.Allocation;

import java.util.List;

public interface AllocationService {

    AllocationResponse assignAsset(Long assetId, Long employeeId);

    AllocationResponse returnAsset(Long assetId);

    List<AllocationResponse> getAssetsByEmployee(Long employeeId, int page, int size);

    List<AllocationResponse> getAllocationHistory(Long assetId, int page, int size);
}

