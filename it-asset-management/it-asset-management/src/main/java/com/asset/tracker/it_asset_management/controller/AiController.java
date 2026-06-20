package com.asset.tracker.it_asset_management.controller;

import com.asset.tracker.it_asset_management.dto.response.ApiResponse;
import com.asset.tracker.it_asset_management.service.ai.AiService;
import com.asset.tracker.it_asset_management.service.asset.AssetService;
import com.asset.tracker.it_asset_management.service.report.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;
    private final AssetService assetService;
    private final ReportService reportService;

    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF','EMPLOYEE')"  )
    @PostMapping("/search")
    public String aiSearch(@RequestBody String query,
                           @RequestParam(defaultValue = "0") int page,
                           @RequestParam(defaultValue = "10") int size
                           ) {
        return aiService.aiSearch(query,assetService.getAllAssets(page, size));
    }

    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF','EMPLOYEE')")
    @PostMapping("/chat")
    public String chat(@RequestBody String question,
                       @RequestParam(defaultValue = "0") int page,
                       @RequestParam(defaultValue = "10") int size

    ) {
        return aiService.chatbotQuery(question, assetService.getAllAssets(page,size));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/report")
    @Cacheable(value = "adminReports", key = "'latest'")
    public String aiReport() {

        Map<String, Long> data = new HashMap<>();

        reportService.getAssetCountByStatus()
                .forEach((k,v) -> data.put("STATUS_" + k.name(), v));

        reportService.getAssetCountByType()
                .forEach((k,v) -> data.put("TYPE_" + k.name(), v));

        reportService.getAssetCountByDepartment()
                .forEach((k,v) -> data.put("DEPT_" + k, v));

        return aiService.generateAiReport(data);
    }

    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF')")
    @GetMapping("/alerts")
    public String alerts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return aiService.generateSmartAlerts(assetService.getAllAssets(page, size));
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/hello")
    public String hello(@RequestParam(defaultValue = "Hello, How are You?") String message) {
        return aiService.chatbotQuery(message,new ArrayList<>());
    }

    @PreAuthorize("hasAnyRole('ADMIN','IT_STAFF','EMPLOYEE')")
    @PostMapping("/summarize")
    public String summarizeIssue(@RequestBody String issueText) {
        return aiService.summarizeIssue(issueText);
    }


    @GetMapping("/asset/{assetId}")
    @Cacheable(value = "assetDesc", key="#assetId")
    public String assetDesc(@PathVariable Long assetId) {
        return aiService.generateAssetDescription(assetId);
    }
}

