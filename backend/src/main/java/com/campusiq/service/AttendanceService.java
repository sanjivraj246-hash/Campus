package com.campusiq.service;

import com.campusiq.dto.AttendanceUpdateDto;
import com.campusiq.model.Attendance;
import com.campusiq.model.StudentProfile;
import com.campusiq.model.Subject;
import com.campusiq.repository.AttendanceRepository;
import com.campusiq.repository.StudentProfileRepository;
import com.campusiq.repository.SubjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final SubjectRepository subjectRepository;

    public AttendanceService(AttendanceRepository attendanceRepository,
                             StudentProfileRepository studentProfileRepository,
                             SubjectRepository subjectRepository) {
        this.attendanceRepository = attendanceRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.subjectRepository = subjectRepository;
    }

    public List<Attendance> getStudentAttendance(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    @Transactional
    public Attendance updateAttendance(AttendanceUpdateDto dto) {
        Attendance attendance = attendanceRepository.findByStudentIdAndSubjectId(dto.getStudentId(), dto.getSubjectId())
                .orElseGet(() -> {
                    StudentProfile student = studentProfileRepository.findById(dto.getStudentId())
                            .orElseThrow(() -> new RuntimeException("Student not found"));
                    Subject subject = subjectRepository.findById(dto.getSubjectId())
                            .orElseThrow(() -> new RuntimeException("Subject not found"));
                    return new Attendance(student, subject, dto.getTotalClasses(), dto.getAttendedClasses());
                });

        attendance.setTotalClasses(dto.getTotalClasses());
        attendance.setAttendedClasses(dto.getAttendedClasses());
        Attendance saved = attendanceRepository.save(attendance);

        // Recalculate average attendance on student profile
        List<Attendance> allStudentRecords = attendanceRepository.findByStudentId(dto.getStudentId());
        if (!allStudentRecords.isEmpty()) {
            double totalPct = allStudentRecords.stream()
                    .mapToDouble(a -> a.getPercentage().doubleValue())
                    .average().orElse(85.0);
            StudentProfile student = attendance.getStudent();
            student.setAttendancePercentage(BigDecimal.valueOf(totalPct));
            studentProfileRepository.save(student);
        }

        return saved;
    }
}
