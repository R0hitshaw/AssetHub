package com.asset.tracker.it_asset_management.repository;

import com.asset.tracker.it_asset_management.model.Document;
import com.asset.tracker.it_asset_management.model.enums.DocumentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document,Long> {

    boolean existsByAssetIdAndFileType(Long assetId, DocumentType type);

    List<Document> findByAssetId(Long assetId);
}
