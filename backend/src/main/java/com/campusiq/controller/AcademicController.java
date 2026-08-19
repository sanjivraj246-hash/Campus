package com.campusiq.controller;

import com.campusiq.model.AcademicRecord;
import com.campusiq.model.Subject;
import com.campusiq.service.AcademicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic")
public class AcademicController {

    private final AcademicService academicService;

    public AcademicController(AcademicService academicService) {
        this.academicService = academicService;
    }

    @GetMapping("/records/{studentId}")
    public ResponseEntity<List<AcademicRecord>> getRecords(@PathVariable Long studentId) {
        return ResponseEntity.ok(academicService.getStudentRecords(studentId));
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<Subject>> getSubjects() {
        return ResponseEntity.ok(academicService.getAllSubjects());
    }
}
