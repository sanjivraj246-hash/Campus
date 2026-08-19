package com.campusiq.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hackathons")
public class Hackathon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 200)
    private String organizer;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "date_start", nullable = false)
    private LocalDateTime dateStart;

    @Column(name = "date_end", nullable = false)
    private LocalDateTime dateEnd;

    @Column(nullable = false, length = 200)
    private String location = "Online";

    @Column(length = 50)
    private String mode = "ONLINE"; // ONLINE, OFFLINE, HYBRID

    @Column(name = "prize_pool", length = 100)
    private String prizePool;

    @Column(name = "required_skills", columnDefinition = "TEXT")
    private String requiredSkills = "[]";

    @Column(name = "registration_deadline", nullable = false)
    private LocalDateTime registrationDeadline;

    @Column(name = "max_team_size")
    private Integer maxTeamSize = 4;

    @Column(name = "registration_url", columnDefinition = "TEXT")
    private String registrationUrl;

    @Column(name = "banner_url", columnDefinition = "TEXT")
    private String bannerUrl;

    public Hackathon() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getOrganizer() { return organizer; }
    public void setOrganizer(String organizer) { this.organizer = organizer; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getDateStart() { return dateStart; }
    public void setDateStart(LocalDateTime dateStart) { this.dateStart = dateStart; }

    public LocalDateTime getDateEnd() { return dateEnd; }
    public void setDateEnd(LocalDateTime dateEnd) { this.dateEnd = dateEnd; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public String getPrizePool() { return prizePool; }
    public void setPrizePool(String prizePool) { this.prizePool = prizePool; }

    public String getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(String requiredSkills) { this.requiredSkills = requiredSkills; }

    public LocalDateTime getRegistrationDeadline() { return registrationDeadline; }
    public void setRegistrationDeadline(LocalDateTime registrationDeadline) { this.registrationDeadline = registrationDeadline; }

    public Integer getMaxTeamSize() { return maxTeamSize; }
    public void setMaxTeamSize(Integer maxTeamSize) { this.maxTeamSize = maxTeamSize; }

    public String getRegistrationUrl() { return registrationUrl; }
    public void setRegistrationUrl(String registrationUrl) { this.registrationUrl = registrationUrl; }

    public String getBannerUrl() { return bannerUrl; }
    public void setBannerUrl(String bannerUrl) { this.bannerUrl = bannerUrl; }
}
