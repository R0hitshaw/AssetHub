package com.asset.tracker.it_asset_management.controller;


import com.asset.tracker.it_asset_management.dto.request.AssetRequest;
import com.asset.tracker.it_asset_management.dto.response.ApiResponse;
import com.asset.tracker.it_asset_management.dto.response.AssetResponse;
import com.asset.tracker.it_asset_management.model.enums.AssetStatus;
import com.asset.tracker.it_asset_management.service.asset.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/asset")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;

    @PostMapping("/add")
    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF')")
    public ResponseEntity<ApiResponse<AssetResponse>> addAsset(@Valid @RequestBody AssetRequest assetRequest)
    {
        AssetResponse response = assetService.addAsset(assetRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AssetResponse>> getAsset( @PathVariable Long id)
    {
        AssetResponse response = assetService.getAssetById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AssetResponse>>>getAllAsset(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    )
    {
        List<AssetResponse> responses = assetService.getAllAssets(page,size);
        return ResponseEntity.ok(ApiResponse.success(responses));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF')")
    public ResponseEntity<ApiResponse<AssetResponse>> updateAsset(@Valid @RequestBody AssetRequest assetRequest, @PathVariable Long id)
    {
        AssetResponse response = assetService.updateAsset(id,assetRequest);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF')")
    public ResponseEntity<ApiResponse<AssetResponse>> updateAssetStatus( @PathVariable Long id, @RequestParam AssetStatus status)
    {
        AssetResponse asset = assetService.updateAssetStatus(id,status);
        return ResponseEntity.ok(ApiResponse.success(asset));
    }

    @PatchMapping("/{id}/retire")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> retireAsset(@PathVariable Long id)
    {
        assetService.retireAsset(id);
        return ResponseEntity.noContent().build();
    }






}
