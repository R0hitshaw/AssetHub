package com.asset.tracker.it_asset_management.service.ai;

import com.asset.tracker.it_asset_management.dto.response.AssetResponse;
import com.asset.tracker.it_asset_management.model.Asset;
import com.asset.tracker.it_asset_management.model.Employee;

import java.util.List;
import java.util.Map;

public interface AiService {

    // Existing
    String generateAssetDescription(Long assetId);
    String summarizeIssue(String issueText);

    // New
    String aiSearch(String query, List<AssetResponse> assets);

    String chatbotQuery(String userQuestion, List<AssetResponse> assets);

    String generateAiReport(Map<String, Long> reportData);

    String generateSmartAlerts(List<AssetResponse> assets);
}

