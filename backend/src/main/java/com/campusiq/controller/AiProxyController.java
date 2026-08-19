package com.campusiq.controller;

import com.campusiq.service.AiIntegrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiProxyController {

    private final AiIntegrationService aiIntegrationService;

    public AiProxyController(AiIntegrationService aiIntegrationService) {
        this.aiIntegrationService = aiIntegrationService;
    }

    @PostMapping("/resume/analyze-text")
    public ResponseEntity<Object> analyzeResume(@RequestBody Object body) {
        return ResponseEntity.ok(aiIntegrationService.forwardAiRequest("/api/ai/resume/analyze-text", body));
    }

    @PostMapping("/skill-gap/analyze")
    public ResponseEntity<Object> analyzeSkillGap(@RequestBody Object body) {
        return ResponseEntity.ok(aiIntegrationService.forwardAiRequest("/api/ai/skill-gap/analyze", body));
    }

    @PostMapping("/learning-path/generate")
    public ResponseEntity<Object> generateLearningPath(@RequestBody Object body) {
        return ResponseEntity.ok(aiIntegrationService.forwardAiRequest("/api/ai/learning-path/generate", body));
    }

    @PostMapping("/interview/generate-questions")
    public ResponseEntity<Object> generateInterviewQuestions(@RequestBody Object body) {
        return ResponseEntity.ok(aiIntegrationService.forwardAiRequest("/api/ai/interview/generate-questions", body));
    }

    @PostMapping("/interview/evaluate-answer")
    public ResponseEntity<Object> evaluateInterviewAnswer(@RequestBody Object body) {
        return ResponseEntity.ok(aiIntegrationService.forwardAiRequest("/api/ai/interview/evaluate-answer", body));
    }

    @PostMapping("/career-advice/chat")
    public ResponseEntity<Object> chatMentor(@RequestBody Object body) {
        return ResponseEntity.ok(aiIntegrationService.forwardAiRequest("/api/ai/career-advice/chat", body));
    }

    @PostMapping("/readiness/calculate")
    public ResponseEntity<Object> calculateReadiness(@RequestBody Object body) {
        return ResponseEntity.ok(aiIntegrationService.forwardAiRequest("/api/ai/readiness/calculate", body));
    }

    @PostMapping("/projects/recommend")
    public ResponseEntity<Object> recommendProjects(@RequestBody Object body) {
        return ResponseEntity.ok(aiIntegrationService.forwardAiRequest("/api/ai/projects/recommend", body));
    }
}
