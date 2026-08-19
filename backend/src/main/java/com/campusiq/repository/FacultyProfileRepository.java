package com.campusiq.repository;

import com.campusiq.model.FacultyProfile;
import com.campusiq.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface FacultyProfileRepository extends JpaRepository<FacultyProfile, Long> {
    Optional<FacultyProfile> findByUser(User user);
    Optional<FacultyProfile> findByUserId(Long userId);
    List<FacultyProfile> findByDepartment(String department);
}
