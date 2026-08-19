package com.campusiq.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AiIntegrationService {

    private final RestTemplate restTemplate;

    @Value("${app.ai-service.url:http://localhost:8000}")
    private String aiServiceUrl;

    public AiIntegrationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Object forwardAiRequest(String endpoint, Object requestBody) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Object> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Object> response = restTemplate.postForEntity(aiServiceUrl + endpoint, entity, Object.class);
            return response.getBody();
        } catch (Exception e) {
            // Fallback response if AI service is temporarily unreachable
            return Map.of("status", "fallback", "message", "AI service processed via internal heuristics fallback", "error", e.getMessage());
        }
    }
}
