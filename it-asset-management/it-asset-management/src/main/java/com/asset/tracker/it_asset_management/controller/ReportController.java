package com.asset.tracker.it_asset_management.controller;

import com.asset.tracker.it_asset_management.dto.response.ApiResponse;
import com.asset.tracker.it_asset_management.dto.response.AssetResponse;
import com.asset.tracker.it_asset_management.model.enums.AssetStatus;
import com.asset.tracker.it_asset_management.model.enums.AssetType;
import com.asset.tracker.it_asset_management.service.report.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/status")
    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF')")
    public ResponseEntity<ApiResponse<Map<AssetStatus, Long>>> byStatus()
    {
        return ResponseEntity.ok(ApiResponse.success(reportService.getAssetCountByStatus()));
    }

    @GetMapping("/type")
    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF')")
    public ResponseEntity<ApiResponse<Map<AssetType, Long>>> byType()
    {
        return ResponseEntity.ok(ApiResponse.success(reportService.getAssetCountByType()));
    }

    @GetMapping("/department")
    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF')")
    public ResponseEntity<ApiResponse<Map<String, Long>>> byDept()
    {
        return ResponseEntity.ok(ApiResponse.success(reportService.getAssetCountByDepartment()));
    }

    @GetMapping("/expiredAssets")
    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF')")
    public ResponseEntity<ApiResponse<List<AssetResponse>>> byExpiry(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "30") int days
    )
    {
        return ResponseEntity.ok(ApiResponse.success(reportService.getWarrantyExpiringAssets(page, size, days)));
    }

}
