package com.campusiq.controller;

import com.campusiq.dto.AttendanceUpdateDto;
import com.campusiq.model.Attendance;
import com.campusiq.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Attendance>> getStudentAttendance(@PathVariable Long studentId) {
        return ResponseEntity.ok(attendanceService.getStudentAttendance(studentId));
    }

    @PostMapping("/update")
    public ResponseEntity<Attendance> updateAttendance(@Valid @RequestBody AttendanceUpdateDto dto) {
        return ResponseEntity.ok(attendanceService.updateAttendance(dto));
    }
}
