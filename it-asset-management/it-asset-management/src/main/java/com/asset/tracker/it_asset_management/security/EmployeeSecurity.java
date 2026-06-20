package com.asset.tracker.it_asset_management.security;

import com.asset.tracker.it_asset_management.model.User;
import com.asset.tracker.it_asset_management.repository.EmployeeRepository;
import com.asset.tracker.it_asset_management.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("employeeSecurity")
@RequiredArgsConstructor
public class EmployeeSecurity {

    private final EmployeeRepository employeeRepository;
    private final UserService userService;


    public boolean isOwner(Long employeeId) {
        User current = userService.getCurrentUser();

        return employeeRepository.findById(employeeId)
                .map(e -> e.getUser() != null &&
                        e.getUser().getId().equals(current.getId()))
                .orElse(false);
    }
}

