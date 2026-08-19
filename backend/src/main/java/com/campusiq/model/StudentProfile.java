package com.campusiq.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String college = "Institute of Engineering & Technology";

    @Column(nullable = false, length = 100)
    private String department;

    @Column(nullable = false)
    private Integer year = 3;

    @Column(nullable = false, precision = 4, scale = 2)
    private BigDecimal cgpa = BigDecimal.valueOf(8.50);

    @Column(length = 20)
    private String phone;

    @Column(name = "target_career", length = 100)
    private String targetCareer = "Full Stack Developer";

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "github_url", columnDefinition = "TEXT")
    private String githubUrl;

    @Column(name = "linkedin_url", columnDefinition = "TEXT")
    private String linkedinUrl;

    @Column(name = "portfolio_url", columnDefinition = "TEXT")
    private String portfolioUrl;

    @Column(name = "career_readiness_score")
    private Integer careerReadinessScore = 75;

    @Column(name = "technical_skill_score")
    private Integer technicalSkillScore = 80;

    @Column(name = "dsa_score")
    private Integer dsaScore = 65;

    @Column(name = "projects_score")
    private Integer projectsScore = 75;

    @Column(name = "academic_score")
    private Integer academicScore = 85;

    @Column(name = "resume_score")
    private Integer resumeScore = 80;

    @Column(name = "interview_score")
    private Integer interviewScore = 65;

    @Column(name = "certifications_score")
    private Integer certificationsScore = 70;

    @Column(name = "attendance_percentage", precision = 5, scale = 2)
    private BigDecimal attendancePercentage = BigDecimal.valueOf(88.50);

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public StudentProfile() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public BigDecimal getCgpa() { return cgpa; }
    public void setCgpa(BigDecimal cgpa) { this.cgpa = cgpa; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getTargetCareer() { return targetCareer; }
    public void setTargetCareer(String targetCareer) { this.targetCareer = targetCareer; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getPortfolioUrl() { return portfolioUrl; }
    public void setPortfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; }

    public Integer getCareerReadinessScore() { return careerReadinessScore; }
    public void setCareerReadinessScore(Integer careerReadinessScore) { this.careerReadinessScore = careerReadinessScore; }

    public Integer getTechnicalSkillScore() { return technicalSkillScore; }
    public void setTechnicalSkillScore(Integer technicalSkillScore) { this.technicalSkillScore = technicalSkillScore; }

    public Integer getDsaScore() { return dsaScore; }
    public void setDsaScore(Integer dsaScore) { this.dsaScore = dsaScore; }

    public Integer getProjectsScore() { return projectsScore; }
    public void setProjectsScore(Integer projectsScore) { this.projectsScore = projectsScore; }

    public Integer getAcademicScore() { return academicScore; }
    public void setAcademicScore(Integer academicScore) { this.academicScore = academicScore; }

    public Integer getResumeScore() { return resumeScore; }
    public void setResumeScore(Integer resumeScore) { this.resumeScore = resumeScore; }

    public Integer getInterviewScore() { return interviewScore; }
    public void setInterviewScore(Integer interviewScore) { this.interviewScore = interviewScore; }

    public Integer getCertificationsScore() { return certificationsScore; }
    public void setCertificationsScore(Integer certificationsScore) { this.certificationsScore = certificationsScore; }

    public BigDecimal getAttendancePercentage() { return attendancePercentage; }
    public void setAttendancePercentage(BigDecimal attendancePercentage) { this.attendancePercentage = attendancePercentage; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
