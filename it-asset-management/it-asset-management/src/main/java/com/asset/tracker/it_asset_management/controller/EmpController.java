package com.asset.tracker.it_asset_management.controller;

import com.asset.tracker.it_asset_management.dto.request.EmployeeRequest;
import com.asset.tracker.it_asset_management.dto.response.ApiResponse;
import com.asset.tracker.it_asset_management.dto.response.EmployeeResponse;
import com.asset.tracker.it_asset_management.service.employee.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmpController {

    private final EmployeeService employeeService;

    @PostMapping("/add")
    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF')")
    public ResponseEntity<ApiResponse<EmployeeResponse>> createEmployee(@Valid @RequestBody EmployeeRequest employeeRequest)
    {
        EmployeeResponse employeeResponse = employeeService.createEmployee(employeeRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(employeeResponse));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeResponse>> getEmpById(@PathVariable Long id)
    {
        EmployeeResponse response = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF')")
    public ResponseEntity<ApiResponse<List<EmployeeResponse>>> getAllActiveEmp(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    )
    {
        List<EmployeeResponse> responses = employeeService.getAllActiveEmployees(page,size);
        return ResponseEntity.ok(ApiResponse.success(responses));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF')")
    public ResponseEntity<ApiResponse<EmployeeResponse>> updateEmployee(@Valid @RequestBody EmployeeRequest employeeRequest,@PathVariable Long id)
    {
        EmployeeResponse response = employeeService.updateEmployee(id,employeeRequest);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deactivateEmp(@PathVariable Long id)
    {
        employeeService.deactivateEmployee(id);
        return  ResponseEntity.noContent().build();
    }
}
