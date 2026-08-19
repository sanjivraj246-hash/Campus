package com.campusiq.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "faculty_profiles")
public class FacultyProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, length = 100)
    private String department;

    @Column(nullable = false, length = 100)
    private String designation;

    @Column(name = "cabin_location", length = 100)
    private String cabinLocation;

    @Column(columnDefinition = "TEXT")
    private String specialization;

    @Column(length = 20)
    private String phone;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public FacultyProfile() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getCabinLocation() { return cabinLocation; }
    public void setCabinLocation(String cabinLocation) { this.cabinLocation = cabinLocation; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
