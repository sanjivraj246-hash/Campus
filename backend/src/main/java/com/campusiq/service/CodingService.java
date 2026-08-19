package com.campusiq.service;

import com.campusiq.dto.CodingSubmissionRequest;
import com.campusiq.model.CodingProblem;
import com.campusiq.model.CodingSubmission;
import com.campusiq.model.StudentProfile;
import com.campusiq.repository.CodingProblemRepository;
import com.campusiq.repository.CodingSubmissionRepository;
import com.campusiq.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CodingService {

    private final CodingProblemRepository codingProblemRepository;
    private final CodingSubmissionRepository codingSubmissionRepository;
    private final StudentProfileRepository studentProfileRepository;

    public CodingService(CodingProblemRepository codingProblemRepository,
                         CodingSubmissionRepository codingSubmissionRepository,
                         StudentProfileRepository studentProfileRepository) {
        this.codingProblemRepository = codingProblemRepository;
        this.codingSubmissionRepository = codingSubmissionRepository;
        this.studentProfileRepository = studentProfileRepository;
    }

    public List<CodingProblem> getAllProblems() {
        return codingProblemRepository.findAll();
    }

    @Transactional
    public CodingSubmission submitCode(Long userId, CodingSubmissionRequest request) {
        StudentProfile student = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found for user id " + userId));

        CodingProblem problem = codingProblemRepository.findById(request.getProblemId())
                .orElseThrow(() -> new RuntimeException("Problem not found"));

        CodingSubmission sub = new CodingSubmission();
        sub.setStudent(student);
        sub.setProblem(problem);
        sub.setLanguage(request.getLanguage());
        sub.setSubmittedCode(request.getSubmittedCode());
        sub.setStatus("ACCEPTED");
        sub.setExecutionTimeMs(38);
        sub.setMemoryKb(14100);
        sub.setTestCasesPassed(5);
        sub.setTotalTestCases(5);

        // Boost DSA score slightly on success
        int newDsa = Math.min(100, student.getDsaScore() + 2);
        student.setDsaScore(newDsa);
        studentProfileRepository.save(student);

        return codingSubmissionRepository.save(sub);
    }
}
