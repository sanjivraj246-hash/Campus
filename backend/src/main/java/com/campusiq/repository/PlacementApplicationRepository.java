package com.campusiq.repository;

import com.campusiq.model.PlacementApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacementApplicationRepository extends JpaRepository<PlacementApplication, Long> {
    List<PlacementApplication> findByStudentId(Long studentId);
    List<PlacementApplication> findByStudentIdAndStatus(Long studentId, String status);
}
