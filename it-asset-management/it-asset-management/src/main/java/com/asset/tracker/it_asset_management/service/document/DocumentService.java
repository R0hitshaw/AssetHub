package com.asset.tracker.it_asset_management.service.document;

import com.asset.tracker.it_asset_management.model.Document;
import com.asset.tracker.it_asset_management.model.enums.DocumentType;

import java.util.List;

public interface DocumentService {

    Document uploadDocument(Long assetId,
                            String fileName,
                            DocumentType type,
                            String s3Url);

    List<Document> getDocumentsByAsset(Long assetId);

    void deleteDocument(Long documentId);
}

