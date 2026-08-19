package com.campusiq.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "placement_applications")
public class PlacementApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @Column(name = "company_name", nullable = false, length = 200)
    private String companyName;

    @Column(name = "role_title", nullable = false, length = 150)
    private String roleTitle;

    @Column(name = "ctc_lpa", precision = 5, scale = 2)
    private BigDecimal ctcLpa;

    @Column(length = 150)
    private String location;

    @Column(name = "applied_date", nullable = false)
    private LocalDate appliedDate = LocalDate.now();

    @Column(nullable = false, length = 50)
    private String status = "APPLIED"; // APPLIED, ONLINE_ASSESSMENT, TECHNICAL_INTERVIEW, HR_INTERVIEW, SELECTED, REJECTED

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "interview_date")
    private LocalDateTime interviewDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public PlacementApplication() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public StudentProfile getStudent() { return student; }
    public void setStudent(StudentProfile student) { this.student = student; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getRoleTitle() { return roleTitle; }
    public void setRoleTitle(String roleTitle) { this.roleTitle = roleTitle; }

    public BigDecimal getCtcLpa() { return ctcLpa; }
    public void setCtcLpa(BigDecimal ctcLpa) { this.ctcLpa = ctcLpa; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalDate getAppliedDate() { return appliedDate; }
    public void setAppliedDate(LocalDate appliedDate) { this.appliedDate = appliedDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getInterviewDate() { return interviewDate; }
    public void setInterviewDate(LocalDateTime interviewDate) { this.interviewDate = interviewDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
