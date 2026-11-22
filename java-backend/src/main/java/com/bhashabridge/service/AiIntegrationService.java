package com.bhashabridge.service;

import com.bhashabridge.dto.ChatDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class AiIntegrationService {

    private final WebClient webClient;

    public AiIntegrationService(WebClient.Builder webClientBuilder, @Value("${ai.service.url}") String aiServiceUrl) {
        this.webClient = webClientBuilder.baseUrl(aiServiceUrl).build();
    }

    public Mono<ChatDto.Response> forwardChat(ChatDto.Request request) {
        return this.webClient.post()
                .uri("/chat")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatDto.Response.class)
                .onErrorResume(e -> {
                    ChatDto.Response fallback = new ChatDto.Response();
                    fallback.setSession_id(request.getSession_id());
                    fallback.setResponse("Error connecting to AI backend engine. Please check that the Python AI service is running on port 8000: " + e.getMessage());
                    fallback.setLanguage(request.getLanguage());
                    fallback.setDetected_language("en-IN");
                    fallback.setModel_used("gateway-fallback");
                    return Mono.just(fallback);
                });
    }

    public Mono<Map> forwardKnowledgeSearch(Map<String, Object> request) {
        return this.webClient.post()
                .uri("/knowledge/search")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(Map.class);
    }

    public Mono<Map> getSystemStatus() {
        return this.webClient.get()
                .uri("/system/status")
                .retrieve()
                .bodyToMono(Map.class)
                .onErrorResume(e -> Mono.just(Map.of("status", "degraded", "error", e.getMessage())));
    }
}
