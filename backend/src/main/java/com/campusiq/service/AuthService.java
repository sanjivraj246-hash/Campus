package com.campusiq.service;

import com.campusiq.config.JwtUtil;
import com.campusiq.dto.AuthRequest;
import com.campusiq.dto.AuthResponse;
import com.campusiq.dto.RegisterRequest;
import com.campusiq.model.Role;
import com.campusiq.model.StudentProfile;
import com.campusiq.model.User;
import com.campusiq.repository.StudentProfileRepository;
import com.campusiq.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       StudentProfileRepository studentProfileRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getId());
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole(), user.getAvatarUrl());
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        User user = new User(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getRole(),
                request.getFullName(),
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
        );
        user = userRepository.save(user);

        if (request.getRole() == Role.STUDENT) {
            StudentProfile profile = new StudentProfile();
            profile.setUser(user);
            profile.setCollege(request.getCollege() != null ? request.getCollege() : "Institute of Engineering & Technology");
            profile.setDepartment(request.getDepartment() != null ? request.getDepartment() : "Computer Science & Engineering");
            profile.setYear(request.getYear() != null ? request.getYear() : 3);
            profile.setCgpa(request.getCgpa() != null ? request.getCgpa() : java.math.BigDecimal.valueOf(8.50));
            profile.setPhone(request.getPhone());
            profile.setTargetCareer(request.getTargetCareer() != null ? request.getTargetCareer() : "Full Stack Developer");
            studentProfileRepository.save(profile);
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getId());
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole(), user.getAvatarUrl());
    }
}
