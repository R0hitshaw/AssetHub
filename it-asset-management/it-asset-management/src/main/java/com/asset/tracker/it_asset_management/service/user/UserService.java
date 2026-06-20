package com.asset.tracker.it_asset_management.service.user;

import com.asset.tracker.it_asset_management.model.User;
import com.asset.tracker.it_asset_management.model.enums.Role;

public interface UserService {

    User getCurrentUser();
    String getCurrentUsername();
    Role getCurrentUserRole();
    boolean isAdmin();
    boolean isEmployee();
    boolean isITStaff();
}
