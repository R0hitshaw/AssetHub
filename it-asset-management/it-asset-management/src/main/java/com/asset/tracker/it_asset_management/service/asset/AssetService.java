package com.asset.tracker.it_asset_management.service.asset;
import com.asset.tracker.it_asset_management.dto.request.AssetRequest;
import com.asset.tracker.it_asset_management.dto.response.AssetResponse;
import com.asset.tracker.it_asset_management.model.Asset;
import java.util.*;
import com.asset.tracker.it_asset_management.model.enums.AssetStatus;
import com.asset.tracker.it_asset_management.model.enums.AssetType;

public interface AssetService {

    AssetResponse addAsset(AssetRequest assetRequest);

    AssetResponse getAssetById(Long id);

    List<AssetResponse> getAllAssets(int page, int size);

    List<AssetResponse> getAvailableAssets(int page, int size);

    List<AssetResponse> getAssetsByType(AssetType type,int page, int size);

    AssetResponse updateAsset(Long id, AssetRequest assetRequest);

    AssetResponse updateAssetStatus(Long id, AssetStatus status);


    void retireAsset(Long id);

    Asset getAssetEntity(Long id);
}

