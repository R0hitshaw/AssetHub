package com.asset.tracker.it_asset_management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AllocationResponse {

    private Long id;

    private Long assetId;
    private String assetTag;

    private Long employeeId;
    private String employeeName;

    private LocalDate assignedDate;
    private LocalDate returnedDate;

    private String assignedBy;
}
