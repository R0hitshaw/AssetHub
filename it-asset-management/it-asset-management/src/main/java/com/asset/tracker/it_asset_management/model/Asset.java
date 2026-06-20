package com.asset.tracker.it_asset_management.model;
import com.asset.tracker.it_asset_management.model.enums.AssetType;
import com.asset.tracker.it_asset_management.model.enums.AssetStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(unique = true, nullable = false)
    private String assetTag;
    // e.g., LAP-DEL-001

    private String brand;
    private String model;

    @Enumerated(EnumType.STRING)
    private AssetType type;

    @Enumerated(EnumType.STRING)
    private AssetStatus status;

    private LocalDate purchaseDate;
    private LocalDate warrantyExpiry;

    private String assignedDepartment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_user_id")
    private Employee assignedEmployee;


}

