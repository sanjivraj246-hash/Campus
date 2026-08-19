package com.campusiq.service;

import com.campusiq.dto.ProjectDto;
import com.campusiq.model.Project;
import com.campusiq.model.User;
import com.campusiq.repository.ProjectRepository;
import com.campusiq.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ProjectDto getProjectById(Long id) {
        Project p = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id " + id));
        return mapToDto(p);
    }

    @Transactional
    public ProjectDto createProject(Long userId, ProjectDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

        Project p = new Project();
        p.setTitle(dto.getTitle());
        p.setDescription(dto.getDescription());
        p.setCategory(dto.getCategory());
        p.setTechStack(dto.getTechStack() != null ? dto.getTechStack().toString() : "[]");
        p.setDifficulty(dto.getDifficulty() != null ? dto.getDifficulty() : "INTERMEDIATE");
        p.setTeamSize(dto.getTeamSize() != null ? dto.getTeamSize() : 4);
        p.setGithubUrl(dto.getGithubUrl());
        p.setDemoUrl(dto.getDemoUrl());
        p.setStatus(dto.getStatus() != null ? dto.getStatus() : "IN_PROGRESS");
        p.setCreatedBy(user);

        return mapToDto(projectRepository.save(p));
    }

    @Transactional
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    private ProjectDto mapToDto(Project p) {
        ProjectDto dto = new ProjectDto();
        dto.setId(p.getId());
        dto.setTitle(p.getTitle());
        dto.setDescription(p.getDescription());
        dto.setCategory(p.getCategory());
        dto.setDifficulty(p.getDifficulty());
        dto.setTeamSize(p.getTeamSize());
        dto.setGithubUrl(p.getGithubUrl());
        dto.setDemoUrl(p.getDemoUrl());
        dto.setStatus(p.getStatus());
        dto.setCreatedByUserId(p.getCreatedBy().getId());
        dto.setCreatedByName(p.getCreatedBy().getFullName());
        return dto;
    }
}
