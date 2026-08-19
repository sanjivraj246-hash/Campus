package com.campusiq.repository;

import com.campusiq.model.AcademicRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AcademicRecordRepository extends JpaRepository<AcademicRecord, Long> {
    List<AcademicRecord> findByStudentId(Long studentId);
    List<AcademicRecord> findByStudentIdAndSemester(Long studentId, Integer semester);
    Optional<AcademicRecord> findByStudentIdAndSubjectIdAndSemester(Long studentId, Long subjectId, Integer semester);
}
