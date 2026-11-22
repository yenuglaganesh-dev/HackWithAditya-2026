package com.bhashabridge.controller;

import com.bhashabridge.dto.ChatDto;
import com.bhashabridge.service.AiIntegrationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiGatewayController {

    private final AiIntegrationService aiIntegrationService;

    public ApiGatewayController(AiIntegrationService aiIntegrationService) {
        this.aiIntegrationService = aiIntegrationService;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "healthy");
        status.put("service", "BhashaBridge Java Gateway");
        status.put("timestamp", Instant.now().toString());
        return ResponseEntity.ok(status);
    }

    @PostMapping("/chat")
    public Mono<ResponseEntity<ChatDto.Response>> chat(@Valid @RequestBody ChatDto.Request request) {
        return aiIntegrationService.forwardChat(request)
                .map(ResponseEntity::ok);
    }

    @PostMapping("/knowledge/search")
    public Mono<ResponseEntity<Map>> searchKnowledge(@RequestBody Map<String, Object> request) {
        return aiIntegrationService.forwardKnowledgeSearch(request)
                .map(ResponseEntity::ok);
    }

    @GetMapping("/system/status")
    public Mono<ResponseEntity<Map>> systemStatus() {
        return aiIntegrationService.getSystemStatus()
                .map(ResponseEntity::ok);
    }

    @PostMapping("/speech/transcribe")
    public ResponseEntity<Map<String, Object>> speechTranscribe() {
        Map<String, Object> res = new HashMap<>();
        res.put("provider", "Web Speech API (Browser Native)");
        res.put("status", "Free-first primary speech-to-text operates natively inside user browser.");
        return ResponseEntity.ok(res);
    }

    @PostMapping("/speech/synthesize")
    public ResponseEntity<Map<String, Object>> speechSynthesize() {
        Map<String, Object> res = new HashMap<>();
        res.put("provider", "SpeechSynthesis (Browser Native)");
        res.put("status", "Free-first primary text-to-speech operates natively inside user browser.");
        return ResponseEntity.ok(res);
    }
}
