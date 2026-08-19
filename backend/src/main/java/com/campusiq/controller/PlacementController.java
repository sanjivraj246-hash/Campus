package com.campusiq.controller;

import com.campusiq.config.JwtUtil;
import com.campusiq.model.PlacementApplication;
import com.campusiq.service.PlacementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placements")
public class PlacementController {

    private final PlacementService placementService;
    private final JwtUtil jwtUtil;

    public PlacementController(PlacementService placementService, JwtUtil jwtUtil) {
        this.placementService = placementService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<List<PlacementApplication>> getMyApplications(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        return ResponseEntity.ok(placementService.getApplicationsForStudent(userId));
    }

    @PostMapping
    public ResponseEntity<PlacementApplication> createApplication(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody PlacementApplication app) {
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        return ResponseEntity.ok(placementService.saveApplication(userId, app));
    }
}
