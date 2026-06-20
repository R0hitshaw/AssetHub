package com.asset.tracker.it_asset_management.dto.response;

import lombok.Data;

@Data
public class EmployeeResponse {

    private Long id;
    private String name;
    private String email;
    private String department;
    private boolean active;

}
