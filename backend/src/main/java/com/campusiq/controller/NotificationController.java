package com.campusiq.controller;

import com.campusiq.config.JwtUtil;
import com.campusiq.model.Notification;
import com.campusiq.repository.NotificationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;
    private final JwtUtil jwtUtil;

    public NotificationController(NotificationRepository notificationRepository, JwtUtil jwtUtil) {
        this.notificationRepository = notificationRepository;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        return ResponseEntity.ok(notificationRepository.findByUserIdOrderByCreatedAtDesc(userId));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        notificationRepository.findById(id).ifPresent(n -> {
            n.setIsRead(true);
            notificationRepository.save(n);
        });
        return ResponseEntity.ok().build();
    }
}
