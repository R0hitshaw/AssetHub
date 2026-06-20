package com.asset.tracker.it_asset_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.asset.tracker.it_asset_management.model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String Username);
    Boolean existsByUsername(String Username);
}
