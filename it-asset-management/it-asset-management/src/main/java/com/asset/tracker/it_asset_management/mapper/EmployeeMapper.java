package com.asset.tracker.it_asset_management.mapper;

import com.asset.tracker.it_asset_management.dto.request.EmployeeRequest;
import com.asset.tracker.it_asset_management.dto.response.EmployeeResponse;
import com.asset.tracker.it_asset_management.model.Employee;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EmployeeMapper {

    public Employee toEntity(EmployeeRequest employeeRequest)
    {
        Employee e = new Employee();
        e.setName(employeeRequest.getName());
        e.setEmail(employeeRequest.getEmail());
        e.setDepartment(employeeRequest.getDepartment());
        return e;
    }

    public EmployeeResponse toResponseDTO(Employee employee)
    {
        EmployeeResponse response = new EmployeeResponse();
        response.setId(employee.getId());
        response.setName(employee.getName());
        response.setEmail(employee.getEmail());
        response.setDepartment(employee.getDepartment());
        response.setActive(employee.isActive());
        return response;
    }

    public List<EmployeeResponse> toDTOList(List<Employee> employees)
    {
        return employees.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }
}
