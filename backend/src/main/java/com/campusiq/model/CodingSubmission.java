package com.campusiq.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "coding_submissions")
public class CodingSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "problem_id", nullable = false)
    private CodingProblem problem;

    @Column(nullable = false, length = 50)
    private String language; // python, java, cpp, javascript

    @Column(name = "submitted_code", nullable = false, columnDefinition = "TEXT")
    private String submittedCode;

    @Column(nullable = false, length = 50)
    private String status; // ACCEPTED, WRONG_ANSWER, TIME_LIMIT_EXCEEDED, RUNTIME_ERROR

    @Column(name = "execution_time_ms")
    private Integer executionTimeMs = 45;

    @Column(name = "memory_kb")
    private Integer memoryKb = 14200;

    @Column(name = "test_cases_passed")
    private Integer testCasesPassed = 5;

    @Column(name = "total_test_cases")
    private Integer totalTestCases = 5;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt = LocalDateTime.now();

    public CodingSubmission() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public StudentProfile getStudent() { return student; }
    public void setStudent(StudentProfile student) { this.student = student; }

    public CodingProblem getProblem() { return problem; }
    public void setProblem(CodingProblem problem) { this.problem = problem; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getSubmittedCode() { return submittedCode; }
    public void setSubmittedCode(String submittedCode) { this.submittedCode = submittedCode; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(Integer executionTimeMs) { this.executionTimeMs = executionTimeMs; }

    public Integer getMemoryKb() { return memoryKb; }
    public void setMemoryKb(Integer memoryKb) { this.memoryKb = memoryKb; }

    public Integer getTestCasesPassed() { return testCasesPassed; }
    public void setTestCasesPassed(Integer testCasesPassed) { this.testCasesPassed = testCasesPassed; }

    public Integer getTotalTestCases() { return totalTestCases; }
    public void setTotalTestCases(Integer totalTestCases) { this.totalTestCases = totalTestCases; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}
