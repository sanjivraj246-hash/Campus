package com.campusiq.service;

import com.campusiq.model.PlacementApplication;
import com.campusiq.model.StudentProfile;
import com.campusiq.repository.PlacementApplicationRepository;
import com.campusiq.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PlacementService {

    private final PlacementApplicationRepository placementApplicationRepository;
    private final StudentProfileRepository studentProfileRepository;

    public PlacementService(PlacementApplicationRepository placementApplicationRepository,
                            StudentProfileRepository studentProfileRepository) {
        this.placementApplicationRepository = placementApplicationRepository;
        this.studentProfileRepository = studentProfileRepository;
    }

    public List<PlacementApplication> getApplicationsForStudent(Long userId) {
        StudentProfile student = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found for user " + userId));
        return placementApplicationRepository.findByStudentId(student.getId());
    }

    @Transactional
    public PlacementApplication saveApplication(Long userId, PlacementApplication app) {
        StudentProfile student = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found for user " + userId));
        app.setStudent(student);
        return placementApplicationRepository.save(app);
    }
}
