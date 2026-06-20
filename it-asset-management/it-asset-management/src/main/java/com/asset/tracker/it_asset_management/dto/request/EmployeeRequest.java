package com.asset.tracker.it_asset_management.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EmployeeRequest {

    @NotBlank
    private String name;

    @Email
    private String email;

    @NotBlank
    private String department;

}
