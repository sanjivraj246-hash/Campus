package com.campusiq.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "academic_records", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"student_id", "subject_id", "semester"})
})
public class AcademicRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(nullable = false)
    private Integer semester;

    @Column(name = "internal_marks", precision = 5, scale = 2)
    private BigDecimal internalMarks = BigDecimal.ZERO;

    @Column(name = "assignment_marks", precision = 5, scale = 2)
    private BigDecimal assignmentMarks = BigDecimal.ZERO;

    @Column(name = "exam_marks", precision = 5, scale = 2)
    private BigDecimal examMarks = BigDecimal.ZERO;

    @Column(name = "total_marks", precision = 5, scale = 2)
    private BigDecimal totalMarks = BigDecimal.ZERO;

    @Column(length = 5)
    private String grade = "A";

    @Column(name = "ai_feedback", columnDefinition = "TEXT")
    private String aiFeedback;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public AcademicRecord() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public StudentProfile getStudent() { return student; }
    public void setStudent(StudentProfile student) { this.student = student; }

    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public BigDecimal getInternalMarks() { return internalMarks; }
    public void setInternalMarks(BigDecimal internalMarks) { this.internalMarks = internalMarks; }

    public BigDecimal getAssignmentMarks() { return assignmentMarks; }
    public void setAssignmentMarks(BigDecimal assignmentMarks) { this.assignmentMarks = assignmentMarks; }

    public BigDecimal getExamMarks() { return examMarks; }
    public void setExamMarks(BigDecimal examMarks) { this.examMarks = examMarks; }

    public BigDecimal getTotalMarks() { return totalMarks; }
    public void setTotalMarks(BigDecimal totalMarks) { this.totalMarks = totalMarks; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public String getAiFeedback() { return aiFeedback; }
    public void setAiFeedback(String aiFeedback) { this.aiFeedback = aiFeedback; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
