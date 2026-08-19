package com.campusiq.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendance", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"student_id", "subject_id"})
})
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(name = "total_classes", nullable = false)
    private Integer totalClasses = 40;

    @Column(name = "attended_classes", nullable = false)
    private Integer attendedClasses = 35;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "last_updated_by")
    private FacultyProfile lastUpdatedBy;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Attendance() {}

    public Attendance(StudentProfile student, Subject subject, Integer totalClasses, Integer attendedClasses) {
        this.student = student;
        this.subject = subject;
        this.totalClasses = totalClasses;
        this.attendedClasses = attendedClasses;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public StudentProfile getStudent() { return student; }
    public void setStudent(StudentProfile student) { this.student = student; }

    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }

    public Integer getTotalClasses() { return totalClasses; }
    public void setTotalClasses(Integer totalClasses) { this.totalClasses = totalClasses; }

    public Integer getAttendedClasses() { return attendedClasses; }
    public void setAttendedClasses(Integer attendedClasses) { this.attendedClasses = attendedClasses; }

    public BigDecimal getPercentage() {
        if (totalClasses == null || totalClasses == 0) return BigDecimal.ZERO;
        return BigDecimal.valueOf((attendedClasses * 100.0) / totalClasses);
    }

    public FacultyProfile getLastUpdatedBy() { return lastUpdatedBy; }
    public void setLastUpdatedBy(FacultyProfile lastUpdatedBy) { this.lastUpdatedBy = lastUpdatedBy; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
