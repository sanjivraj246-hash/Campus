package com.campusiq.dto;

import com.campusiq.model.Role;

public class AuthResponse {

    private String token;
    private Long userId;
    private String email;
    private String fullName;
    private Role role;
    private String avatarUrl;

    public AuthResponse() {}

    public AuthResponse(String token, Long userId, String email, String fullName, Role role, String avatarUrl) {
        this.token = token;
        this.userId = userId;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.avatarUrl = avatarUrl;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
}
