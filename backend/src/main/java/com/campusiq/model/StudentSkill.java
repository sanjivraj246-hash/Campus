package com.campusiq.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student_skills", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"student_id", "skill_id"})
})
public class StudentSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(name = "proficiency_level", nullable = false, length = 50)
    private String proficiencyLevel = "INTERMEDIATE";

    @Column(nullable = false)
    private Boolean verified = false;

    @Column(nullable = false)
    private Integer score = 70;

    public StudentSkill() {}

    public StudentSkill(StudentProfile student, Skill skill, String proficiencyLevel, Boolean verified, Integer score) {
        this.student = student;
        this.skill = skill;
        this.proficiencyLevel = proficiencyLevel;
        this.verified = verified;
        this.score = score;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public StudentProfile getStudent() { return student; }
    public void setStudent(StudentProfile student) { this.student = student; }

    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }

    public String getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }

    public Boolean getVerified() { return verified; }
    public void setVerified(Boolean verified) { this.verified = verified; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
}
