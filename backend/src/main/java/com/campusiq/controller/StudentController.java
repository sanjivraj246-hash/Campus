package com.campusiq.controller;

import com.campusiq.config.JwtUtil;
import com.campusiq.dto.StudentProfileDto;
import com.campusiq.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;
    private final JwtUtil jwtUtil;

    public StudentController(StudentService studentService, JwtUtil jwtUtil) {
        this.studentService = studentService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/profile")
    public ResponseEntity<StudentProfileDto> getProfile(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        return ResponseEntity.ok(studentService.getProfileByUserId(userId));
    }

    @PutMapping("/profile")
    public ResponseEntity<StudentProfileDto> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody StudentProfileDto dto) {
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        return ResponseEntity.ok(studentService.updateProfile(userId, dto));
    }

    @GetMapping("/all")
    public ResponseEntity<List<StudentProfileDto>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }
}
