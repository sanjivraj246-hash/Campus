package com.campusiq.controller;

import com.campusiq.model.Hackathon;
import com.campusiq.repository.HackathonRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hackathons")
public class HackathonController {

    private final HackathonRepository hackathonRepository;

    public HackathonController(HackathonRepository hackathonRepository) {
        this.hackathonRepository = hackathonRepository;
    }

    @GetMapping
    public ResponseEntity<List<Hackathon>> getHackathons() {
        return ResponseEntity.ok(hackathonRepository.findAll());
    }
}
