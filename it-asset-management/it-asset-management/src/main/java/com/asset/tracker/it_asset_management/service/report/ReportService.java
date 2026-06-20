package com.asset.tracker.it_asset_management.service.report;

import com.asset.tracker.it_asset_management.dto.response.AssetResponse;
import com.asset.tracker.it_asset_management.model.Asset;
import com.asset.tracker.it_asset_management.model.enums.AssetStatus;
import com.asset.tracker.it_asset_management.model.enums.AssetType;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface ReportService {

        Map<AssetStatus, Long> getAssetCountByStatus();

        Map<AssetType, Long> getAssetCountByType();

        Map<String, Long> getAssetCountByDepartment();

        List<AssetResponse> getWarrantyExpiringAssets(int days,int page, int size);

        Map<Long, Long> getAssetCountByEmployee();


}
