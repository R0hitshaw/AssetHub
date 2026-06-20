package com.asset.tracker.it_asset_management.model;
import com.asset.tracker.it_asset_management.model.enums.DocumentType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    @Enumerated(EnumType.STRING)
    @Column(name = "file_type")
    private DocumentType fileType;      // INVOICE, WARRANTY, RECEIPT

    private String s3Url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id")
    private Asset asset;

    private LocalDateTime uploadedAt;
}

