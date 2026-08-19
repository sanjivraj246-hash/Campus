package com.campusiq.repository;

import com.campusiq.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentId(Long studentId);
    Optional<Attendance> findByStudentIdAndSubjectId(Long studentId, Long subjectId);
    List<Attendance> findBySubjectId(Long subjectId);
}
