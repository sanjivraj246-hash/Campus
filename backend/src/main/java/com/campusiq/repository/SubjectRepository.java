package com.campusiq.repository;

import com.campusiq.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Optional<Subject> findByCode(String code);
    List<Subject> findByDepartmentAndSemester(String department, Integer semester);
    List<Subject> findByFacultyId(Long facultyId);
}
