package com.asset.tracker.it_asset_management.security;

import com.asset.tracker.it_asset_management.model.Asset;
import com.asset.tracker.it_asset_management.model.Employee;
import com.asset.tracker.it_asset_management.model.User;
import com.asset.tracker.it_asset_management.model.enums.Role;
import com.asset.tracker.it_asset_management.repository.AssetRepository;
import com.asset.tracker.it_asset_management.repository.UserRepository;
import com.asset.tracker.it_asset_management.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("assetSecurity")
@RequiredArgsConstructor
public class AssetSecurity {

    private final AssetRepository assetRepository;
    private final UserService userService;


    public boolean isOwner(Long assetId) {
        User current = userService.getCurrentUser();

        return assetRepository.findById(assetId)
                .map(asset -> asset.getAssignedEmployee() != null &&
                        asset.getAssignedEmployee().getUser() != null &&
                        asset.getAssignedEmployee().getUser().getId().equals(current.getId()))
                .orElse(false);
    }
}



