package com.campusiq.repository;

import com.campusiq.model.CodingSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodingSubmissionRepository extends JpaRepository<CodingSubmission, Long> {
    List<CodingSubmission> findByStudentId(Long studentId);
    List<CodingSubmission> findByStudentIdAndProblemId(Long studentId, Long problemId);
}
