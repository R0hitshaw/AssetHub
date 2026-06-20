package com.asset.tracker.it_asset_management.service.employee;
import com.asset.tracker.it_asset_management.dto.request.EmployeeRequest;
import com.asset.tracker.it_asset_management.dto.response.EmployeeResponse;
import com.asset.tracker.it_asset_management.model.Employee;
import org.springframework.data.domain.Page;

import java.util.*;

public interface EmployeeService {

    EmployeeResponse createEmployee(EmployeeRequest employeeRequest);

    EmployeeResponse getEmployeeById(Long id);

    List<EmployeeResponse> getAllActiveEmployees(int page, int size);

    List<EmployeeResponse> getEmployeesByDepartment(String department,int page , int size);

    EmployeeResponse updateEmployee(Long id, EmployeeRequest employeeRequest);

    void deactivateEmployee(Long id);

    Employee getEmployeeEntity(Long id);
}

