package com.campusiq.controller;

import com.campusiq.config.JwtUtil;
import com.campusiq.dto.ProjectDto;
import com.campusiq.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final JwtUtil jwtUtil;

    public ProjectController(ProjectService projectService, JwtUtil jwtUtil) {
        this.projectService = projectService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping
    public ResponseEntity<ProjectDto> createProject(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody ProjectDto dto) {
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        return ResponseEntity.ok(projectService.createProject(userId, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
