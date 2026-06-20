package com.asset.tracker.it_asset_management.service.employee;

import com.asset.tracker.it_asset_management.dto.request.EmployeeRequest;
import com.asset.tracker.it_asset_management.dto.response.EmployeeResponse;
import com.asset.tracker.it_asset_management.mapper.EmployeeMapper;
import com.asset.tracker.it_asset_management.model.Employee;
import com.asset.tracker.it_asset_management.model.User;
import com.asset.tracker.it_asset_management.model.enums.Role;
import com.asset.tracker.it_asset_management.repository.EmployeeRepository;
import com.asset.tracker.it_asset_management.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import org.springframework.security.access.AccessDeniedException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserService userService;
    private final EmployeeMapper employeeMapper;


    @Override
    public EmployeeResponse createEmployee(EmployeeRequest employeeRequest) {

        if(!userService.isAdmin() && !userService.isITStaff())
        {
            throw new AccessDeniedException("Not Authorized to create Employee");
        }
        if(employeeRepository.existsByEmail(employeeRequest.getEmail()))
        {
            throw new IllegalArgumentException("Email already exists.");
        }
        Employee employee = employeeMapper.toEntity(employeeRequest);
        employee.setActive(true);
        employee = employeeRepository.save(employee);
        return employeeMapper.toResponseDTO(employee);
    }

    @PreAuthorize("""
    hasAnyRole('ADMIN','IT_STAFF')
    or @employeeSecurity.isOwner(#id)
""")
    @Override
    public EmployeeResponse getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .filter(Employee::isActive)
                .orElseThrow(()->new RuntimeException("Employee Not Found"));

        return employeeMapper.toResponseDTO(employee);
    }

    @Override
    public List<EmployeeResponse> getAllActiveEmployees(int page, int size) {
        Pageable pageable = PageRequest.of(page,size, Sort.by("id").descending());
        Page<Employee> employees = employeeRepository.findAll(pageable);
        return employees.getContent()
                .stream()
                .map(employeeMapper::toResponseDTO)
                .toList();
    }

    @Override
    public List<EmployeeResponse> getEmployeesByDepartment(String department,int page , int size) {
        Pageable pageable = PageRequest.of(page,size, Sort.by("id").descending());
        Page<Employee> employees = employeeRepository.findAll(pageable);
        return employees.getContent()
                .stream()
                .map(employeeMapper::toResponseDTO)
                .toList();
    }

    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest employeeRequest) {

        if(!userService.isAdmin() && !userService.isITStaff())
        {
            throw new AccessDeniedException("User not Authorized");
        }
        Employee existing = employeeRepository.findById(id).orElseThrow(()->new RuntimeException("Employee Not Found"));
        existing.setName(employeeRequest.getName());
        existing.setDepartment(employeeRequest.getDepartment());
        existing = employeeRepository.save(existing);
        return employeeMapper.toResponseDTO(existing);
    }
    @Override
    public void deactivateEmployee(Long id) {
        if(!userService.isAdmin())
        {
            throw new AccessDeniedException("Only Admin can deactivate employee.");
        }

        Employee emp = employeeRepository.findById(id).orElseThrow(()->new RuntimeException("Employee Not Found"));
        emp.setActive(false);
        employeeRepository.save(emp);

    }

    public Employee getEmployeeEntity(Long id)
    {
        return employeeRepository.findById(id).orElseThrow(()->new RuntimeException("Employee Not Found"));
    }
}
