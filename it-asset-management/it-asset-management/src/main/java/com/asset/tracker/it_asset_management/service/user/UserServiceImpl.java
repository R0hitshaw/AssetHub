package com.asset.tracker.it_asset_management.service.user;
import com.asset.tracker.it_asset_management.model.User;
import com.asset.tracker.it_asset_management.model.enums.Role;
import com.asset.tracker.it_asset_management.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.access.AccessDeniedException;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository)
    {
        this.userRepository= userRepository;
    }


    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || !authentication.isAuthenticated())
        {
            throw new AccessDeniedException("Unauthenticated Accesss");
        }
        String username = authentication.getName();
        return  userRepository.findByUsername(username).orElseThrow(()->new AccessDeniedException("User Not Found"));
    }

    @Override
    public String getCurrentUsername() {
        return getCurrentUser().getUsername();
    }

    @Override
    public Role getCurrentUserRole() {
        return getCurrentUser().getRole();
    }

    @Override
    public boolean isAdmin() {
        return getCurrentUserRole() == Role.ADMIN;
    }

    @Override
    public boolean isEmployee() {
        return getCurrentUserRole() == Role.EMPLOYEE;
    }

    @Override
    public boolean isITStaff() {
        return getCurrentUserRole() == Role.IT_STAFF;
    }
}
