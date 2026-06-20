package com.asset.tracker.it_asset_management.service.ai;

import com.asset.tracker.it_asset_management.dto.response.AssetResponse;
import com.asset.tracker.it_asset_management.model.Asset;
import com.asset.tracker.it_asset_management.repository.AssetRepository;
import com.asset.tracker.it_asset_management.service.ai.AiService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.ollama.api.OllamaChatOptions;
import org.springframework.ai.ollama.api.OllamaModel;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AiServiceImpl implements AiService {

    private final ChatClient chatClient;
    private AssetRepository assetRepository;

    public AiServiceImpl(ChatClient.Builder builder, AssetRepository assetRepository) {
        this.chatClient = builder
                .defaultOptions(OllamaChatOptions.builder()
                        .model(OllamaModel.PHI3)
                        .temperature(0.2)
                        .numPredict(300)
                        .build())
                .build();
        this.assetRepository=assetRepository;

        System.out.println("ChatClient initialized with Phi3");
    }

    @Override
    @PreAuthorize("""
    hasAnyRole('ADMIN','IT_STAFF')
    or @assetSecurity.isOwner(#id)
""")
    public String generateAssetDescription(Long assetId) {
        Asset asset = assetRepository.findById(assetId).orElseThrow(() -> new RuntimeException("Asset Not Found"));
        String prompt = """
You are an IT asset management assistant.

Generate a short, factual description using only the provided data.
Do not use marketing language or assumptions.

Include:
- Name and Asset ID
- Brand / Type
- OS (if present)
- Status with date
- Warranty expiry

Keep it concise and professional.

Asset:
{asset}

""".formatted(asset);

        System.out.println(asset);
        return callAi(prompt);
    }

    @Override
    public String summarizeIssue(String issueText) {
        String prompt = """
                Summarize the issue in one clear sentence.

                Rules:
                - Max 25 words
                - No extra explanation

                Issue:
                %s
                """.formatted(issueText);

        return callAi(prompt);
    }

    @Override
    public String aiSearch(String query, List<AssetResponse> assets) {
        String prompt = """
                Act as an IT asset search engine.

                User Query:
                %s

                Asset List:
                %s

                Task:
                - Find matching assets
                - Explain filtering logic shortly

                Rules:
                - Be concise
                - No markdown
                """.formatted(query, buildAssetSummary(assets));

        return callAi(prompt);
    }

    @Override
    public String chatbotQuery(String userQuestion, List<AssetResponse> assets) {
        String prompt = """
                You are an IT asset assistant.

                Asset Context:
                %s

                User Question:
                %s

                Rules:
                - Clear answer
                - Business tone
                - No storytelling
                """.formatted(buildAssetSummary(assets), userQuestion);

        return callAi(prompt);
    }

    @Override
    public String generateAiReport(Map<String, Long> reportData) {
        String prompt = """
                Convert technical asset metrics into a business summary.

                Input Data:
                %s

                Task:
                - Highlight insights
                - Identify risks
                - Keep it executive friendly

                Rules:
                - No markdown
                - Max 6 lines
                """.formatted(reportData);

        return callAi(prompt);
    }

    @Override
    public String generateSmartAlerts(List<AssetResponse> assets) {
        String prompt = """
                Act as an IT Asset Monitoring Engine.

                Analyze asset data and generate alerts.

                Detect:
                - Warranty expiry risks
                - Idle or unused assets
                - Employee overload
                - Maintenance or lifecycle risks

                Rules:
                - Return valid JSON only
                - No explanation
                - No markdown

                JSON Schema:
                {
                  "warrantyAlerts": [],
                  "unusedAssets": [],
                  "employeeOverload": [],
                  "maintenanceAlerts": []
                }

                Asset Data:
                %s
                """.formatted(buildAssetSummary(assets));

        return callAi(prompt);
    }


    private String callAi(String prompt) {
        try {
            return chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();
        } catch (Exception ex) {
            throw new RuntimeException("AI processing failed: " + ex.getMessage(), ex);
        }
    }


    private String buildAssetSummary(List<AssetResponse> assets) {
        if (assets == null || assets.isEmpty()) {
            return "No assets available.";
        }


        return assets.stream()
                .limit(50)
                .map(a -> String.format(
                        "Tag=%s, Dept=%s, Type=%s, Status=%s, WarrantyExpiry=%s",
                        a.getAssetTag(),
                        a.getAssignedDepartment(),
                        a.getType(),
                        a.getStatus(),
                        a.getWarrantyExpiry()
                ))
                .collect(Collectors.joining("\n"));
    }
}
