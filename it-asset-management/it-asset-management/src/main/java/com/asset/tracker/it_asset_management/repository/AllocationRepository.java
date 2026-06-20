package com.asset.tracker.it_asset_management.repository;

import com.asset.tracker.it_asset_management.model.Allocation;
import com.asset.tracker.it_asset_management.model.Asset;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AllocationRepository extends JpaRepository<Allocation,Long> {


    Page<Allocation> findByEmployeeId(Long employeeId, Pageable pageable);

    Page<Allocation> findByAssetId(Long assetId,Pageable pageable);

    @Query("SELECT al.employee.id, COUNT(al) FROM Allocation al WHERE al.returnedDate IS NULL GROUP BY al.employee.id")
    List<Object[]> countAssetsByEmployee();


    Optional<Allocation> findByAssetIdAndReturnedDateIsNull(Long assetId);
}
