package com.campusiq.controller;

import com.campusiq.config.JwtUtil;
import com.campusiq.dto.CodingSubmissionRequest;
import com.campusiq.model.CodingProblem;
import com.campusiq.model.CodingSubmission;
import com.campusiq.service.CodingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coding")
public class CodingController {

    private final CodingService codingService;
    private final JwtUtil jwtUtil;

    public CodingController(CodingService codingService, JwtUtil jwtUtil) {
        this.codingService = codingService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/problems")
    public ResponseEntity<List<CodingProblem>> getAllProblems() {
        return ResponseEntity.ok(codingService.getAllProblems());
    }

    @PostMapping("/submit")
    public ResponseEntity<CodingSubmission> submitCode(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody CodingSubmissionRequest request) {
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        return ResponseEntity.ok(codingService.submitCode(userId, request));
    }
}
