package com.asset.tracker.it_asset_management.controller;

import com.asset.tracker.it_asset_management.dto.request.AllocationRequest;
import com.asset.tracker.it_asset_management.dto.response.AllocationResponse;
import com.asset.tracker.it_asset_management.dto.response.ApiResponse;
import com.asset.tracker.it_asset_management.service.allocation.AllocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/allocation")
@RequiredArgsConstructor
public class AllocationController {

    private final AllocationService allocationService;

    @PostMapping("/assign")
    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF')")
    public ResponseEntity<ApiResponse<AllocationResponse>> assignAsset(@Valid @RequestBody AllocationRequest allocationRequest)
    {
        AllocationResponse response =allocationService.assignAsset(allocationRequest.getAssetId(),allocationRequest.getEmployeeId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/return/{assetId}")
    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF')")
    public ResponseEntity<ApiResponse<AllocationResponse>> returnAsset(@PathVariable Long assetId)
    {
        AllocationResponse response =allocationService.returnAsset(assetId);
        return ResponseEntity.ok(ApiResponse.success(response));

    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<ApiResponse<List<AllocationResponse>>> byEmployee(@PathVariable Long employeeId,
                                                                            @RequestParam(defaultValue = "0") int page,
                                                                            @RequestParam(defaultValue = "10") int size
                                                                            )
    {
        List<AllocationResponse> responses = allocationService.getAssetsByEmployee(employeeId, page,size);
        return ResponseEntity.ok(ApiResponse.success(responses));
    }

    @GetMapping("asset/{asstId}")
    public ResponseEntity<ApiResponse<List<AllocationResponse>>> byAsset(@PathVariable Long assetId,@RequestParam(defaultValue = "0") int page,
                                                                         @RequestParam(defaultValue = "10") int size)
    {
        List<AllocationResponse> resp = allocationService.getAllocationHistory(assetId,page,size);
        return ResponseEntity.ok(ApiResponse.success(resp));
    }


}
