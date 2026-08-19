package com.campusiq.service;

import com.campusiq.dto.StudentProfileDto;
import com.campusiq.model.StudentProfile;
import com.campusiq.model.User;
import com.campusiq.repository.StudentProfileRepository;
import com.campusiq.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;

    public StudentService(StudentProfileRepository studentProfileRepository, UserRepository userRepository) {
        this.studentProfileRepository = studentProfileRepository;
        this.userRepository = userRepository;
    }

    public StudentProfileDto getProfileByUserId(Long userId) {
        StudentProfile profile = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student profile not found for user id " + userId));
        return mapToDto(profile);
    }

    public List<StudentProfileDto> getAllStudents() {
        return studentProfileRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public StudentProfileDto updateProfile(Long userId, StudentProfileDto dto) {
        StudentProfile profile = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student profile not found for user id " + userId));

        if (dto.getFullName() != null) {
            User user = profile.getUser();
            user.setFullName(dto.getFullName());
            if (dto.getAvatarUrl() != null) user.setAvatarUrl(dto.getAvatarUrl());
            userRepository.save(user);
        }

        if (dto.getCollege() != null) profile.setCollege(dto.getCollege());
        if (dto.getDepartment() != null) profile.setDepartment(dto.getDepartment());
        if (dto.getYear() != null) profile.setYear(dto.getYear());
        if (dto.getCgpa() != null) profile.setCgpa(dto.getCgpa());
        if (dto.getPhone() != null) profile.setPhone(dto.getPhone());
        if (dto.getTargetCareer() != null) profile.setTargetCareer(dto.getTargetCareer());
        if (dto.getBio() != null) profile.setBio(dto.getBio());
        if (dto.getGithubUrl() != null) profile.setGithubUrl(dto.getGithubUrl());
        if (dto.getLinkedinUrl() != null) profile.setLinkedinUrl(dto.getLinkedinUrl());
        if (dto.getPortfolioUrl() != null) profile.setPortfolioUrl(dto.getPortfolioUrl());
        if (dto.getCareerReadinessScore() != null) profile.setCareerReadinessScore(dto.getCareerReadinessScore());
        if (dto.getTechnicalSkillScore() != null) profile.setTechnicalSkillScore(dto.getTechnicalSkillScore());
        if (dto.getDsaScore() != null) profile.setDsaScore(dto.getDsaScore());
        if (dto.getProjectsScore() != null) profile.setProjectsScore(dto.getProjectsScore());
        if (dto.getAcademicScore() != null) profile.setAcademicScore(dto.getAcademicScore());
        if (dto.getResumeScore() != null) profile.setResumeScore(dto.getResumeScore());
        if (dto.getInterviewScore() != null) profile.setInterviewScore(dto.getInterviewScore());
        if (dto.getCertificationsScore() != null) profile.setCertificationsScore(dto.getCertificationsScore());

        return mapToDto(studentProfileRepository.save(profile));
    }

    public StudentProfileDto mapToDto(StudentProfile profile) {
        StudentProfileDto dto = new StudentProfileDto();
        dto.setId(profile.getId());
        dto.setUserId(profile.getUser().getId());
        dto.setFullName(profile.getUser().getFullName());
        dto.setEmail(profile.getUser().getEmail());
        dto.setAvatarUrl(profile.getUser().getAvatarUrl());
        dto.setCollege(profile.getCollege());
        dto.setDepartment(profile.getDepartment());
        dto.setYear(profile.getYear());
        dto.setCgpa(profile.getCgpa());
        dto.setPhone(profile.getPhone());
        dto.setTargetCareer(profile.getTargetCareer());
        dto.setBio(profile.getBio());
        dto.setGithubUrl(profile.getGithubUrl());
        dto.setLinkedinUrl(profile.getLinkedinUrl());
        dto.setPortfolioUrl(profile.getPortfolioUrl());
        dto.setCareerReadinessScore(profile.getCareerReadinessScore());
        dto.setTechnicalSkillScore(profile.getTechnicalSkillScore());
        dto.setDsaScore(profile.getDsaScore());
        dto.setProjectsScore(profile.getProjectsScore());
        dto.setAcademicScore(profile.getAcademicScore());
        dto.setResumeScore(profile.getResumeScore());
        dto.setInterviewScore(profile.getInterviewScore());
        dto.setCertificationsScore(profile.getCertificationsScore());
        dto.setAttendancePercentage(profile.getAttendancePercentage());
        return dto;
    }
}
