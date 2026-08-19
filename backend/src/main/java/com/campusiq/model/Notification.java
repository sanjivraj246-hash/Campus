package com.campusiq.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(length = 50)
    private String category; // ATTENDANCE_WARNING, HACKATHON, ASSIGNMENT, LEARNING_MILESTONE, INTERVIEW_REMINDER, PLACEMENT_UPDATE

    @Column(name = "is_read")
    private Boolean isRead = false;

    @Column(name = "action_url", columnDefinition = "TEXT")
    private String actionUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Notification() {}

    public Notification(User user, String title, String message, String category, String actionUrl) {
        this.user = user;
        this.title = title;
        this.message = message;
        this.category = category;
        this.actionUrl = actionUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

    public String getActionUrl() { return actionUrl; }
    public void setActionUrl(String actionUrl) { this.actionUrl = actionUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
