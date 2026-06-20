package com.asset.tracker.it_asset_management.service.document;

import com.asset.tracker.it_asset_management.exception.ResourceNotFoundException;
import com.asset.tracker.it_asset_management.model.Asset;
import com.asset.tracker.it_asset_management.model.Document;
import com.asset.tracker.it_asset_management.repository.AssetRepository;
import com.asset.tracker.it_asset_management.repository.DocumentRepository;
import com.asset.tracker.it_asset_management.service.asset.AssetService;
import com.asset.tracker.it_asset_management.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import com.asset.tracker.it_asset_management.model.enums.DocumentType;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class DocumentServieImpl implements DocumentService{

    private final DocumentRepository documentRepository;
    private final AssetService assetService;
    private final UserService userService;




    @Override
    public Document uploadDocument(Long assetId, String fileName, DocumentType type, String s3Url) {
        if(!userService.isAdmin() && userService.isITStaff())
        {
            throw new AccessDeniedException("Not Authorized to upload document.");
        }
        Asset asset = assetService.getAssetEntity(assetId);
        if(type == DocumentType.INVOICE && documentRepository.existsByAssetIdAndFileType(assetId, type))
        {
            throw new IllegalStateException("Invoice already exists for this asset.");
        }
        Document document = new Document();
        document.setAsset(asset);
        document.setFileName(fileName);
        document.setFileType(type);
        document.setS3Url(s3Url);
        document.setUploadedAt(LocalDateTime.now());

        return documentRepository.save(document);
    }

    @Override
    public List<Document> getDocumentsByAsset(Long assetId) {
        assetService.getAssetById(assetId);
        return documentRepository.findByAssetId(assetId);
    }

    @Override
    public void deleteDocument(Long documentId) {
        if(!userService.isAdmin())
        {
            throw new AccessDeniedException("Only Admin is allowed to delete.");
        }
        Document document=documentRepository.findById(documentId).orElseThrow(()->new RuntimeException("Document not found"));
        documentRepository.delete(document);
    }
}
