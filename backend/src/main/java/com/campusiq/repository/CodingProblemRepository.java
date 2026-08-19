package com.campusiq.repository;

import com.campusiq.model.CodingProblem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CodingProblemRepository extends JpaRepository<CodingProblem, Long> {
    Optional<CodingProblem> findBySlug(String slug);
    List<CodingProblem> findByTopic(String topic);
    List<CodingProblem> findByDifficulty(String difficulty);
}
