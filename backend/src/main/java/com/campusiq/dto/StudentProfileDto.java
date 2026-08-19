package com.campusiq.dto;

import java.math.BigDecimal;

public class StudentProfileDto {

    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String avatarUrl;
    private String college;
    private String department;
    private Integer year;
    private BigDecimal cgpa;
    private String phone;
    private String targetCareer;
    private String bio;
    private String githubUrl;
    private String linkedinUrl;
    private String portfolioUrl;
    private Integer careerReadinessScore;
    private Integer technicalSkillScore;
    private Integer dsaScore;
    private Integer projectsScore;
    private Integer academicScore;
    private Integer resumeScore;
    private Integer interviewScore;
    private Integer certificationsScore;
    private BigDecimal attendancePercentage;

    public StudentProfileDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

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
}
