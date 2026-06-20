package com.asset.tracker.it_asset_management.repository;

import com.asset.tracker.it_asset_management.model.Asset;
import com.asset.tracker.it_asset_management.model.User;
import com.asset.tracker.it_asset_management.model.enums.AssetStatus;
import com.asset.tracker.it_asset_management.model.enums.AssetType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset,Long> {


    Page<Asset> findByStatus(AssetStatus status, Pageable pageable);
    Page<Asset> findByType(AssetType type, Pageable pageable);

    @Query("SELECT a.status, COUNT(a) FROM Asset a GROUP BY a.status")
    List<Object[]> countAssetsByStatus();

    @Query("SELECT a.type, COUNT(a) FROM Asset a GROUP BY a.type")
    List<Object[]> countAssetsByType();

    @Query("SELECT a.assignedDepartment, COUNT(a) FROM Asset a GROUP BY a.assignedDepartment")
    List<Object[]> countAssetsByDepartment();

    @Query("SELECT a FROM Asset a WHERE a.warrantyExpiry <= :date")
    Page<Asset> findAssetsExpiringBefore(@Param("date") LocalDate date, Pageable pageable);


    Page<Asset> findByAssignedEmployee(User user, Pageable pageable);

    boolean existsByIdAndAssignedEmployeeId(Long id, Long employeeId);
}
