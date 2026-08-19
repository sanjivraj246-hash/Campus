package com.campusiq.config;

import com.campusiq.model.*;
import com.campusiq.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final FacultyProfileRepository facultyProfileRepository;
    private final SkillRepository skillRepository;
    private final SubjectRepository subjectRepository;
    private final ProjectRepository projectRepository;
    private final CodingProblemRepository codingProblemRepository;
    private final HackathonRepository hackathonRepository;
    private final PlacementApplicationRepository placementApplicationRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           StudentProfileRepository studentProfileRepository,
                           FacultyProfileRepository facultyProfileRepository,
                           SkillRepository skillRepository,
                           SubjectRepository subjectRepository,
                           ProjectRepository projectRepository,
                           CodingProblemRepository codingProblemRepository,
                           HackathonRepository hackathonRepository,
                           PlacementApplicationRepository placementApplicationRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.facultyProfileRepository = facultyProfileRepository;
        this.skillRepository = skillRepository;
        this.subjectRepository = subjectRepository;
        this.projectRepository = projectRepository;
        this.codingProblemRepository = codingProblemRepository;
        this.hackathonRepository = hackathonRepository;
        this.placementApplicationRepository = placementApplicationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        // 1. Admin
        User admin = new User("admin@campusiq.edu", passwordEncoder.encode("password123"), Role.ADMIN, "Dr. Vikram Malhotra", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150");
        userRepository.save(admin);

        // 2. Faculty
        User facultyUser1 = new User("priya.sharma@campusiq.edu", passwordEncoder.encode("password123"), Role.FACULTY, "Prof. Priya Sharma", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150");
        facultyUser1 = userRepository.save(facultyUser1);
        FacultyProfile faculty1 = new FacultyProfile();
        faculty1.setUser(facultyUser1);
        faculty1.setDepartment("Computer Science & Engineering");
        faculty1.setDesignation("Professor & Head of Dept");
        faculty1.setCabinLocation("CS-Block Room 301");
        faculty1.setSpecialization("Artificial Intelligence & Distributed Systems");
        faculty1.setPhone("+91 98765 43210");
        facultyProfileRepository.save(faculty1);

        // 3. Student (Aarav Patel)
        User studentUser1 = new User("aarav.patel@student.campusiq.edu", passwordEncoder.encode("password123"), Role.STUDENT, "Aarav Patel", "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150");
        studentUser1 = userRepository.save(studentUser1);
        StudentProfile student1 = new StudentProfile();
        student1.setUser(studentUser1);
        student1.setCollege("MIT Institute of Technology");
        student1.setDepartment("Computer Science & Engineering");
        student1.setYear(3);
        student1.setCgpa(BigDecimal.valueOf(8.85));
        student1.setPhone("+91 91234 56789");
        student1.setTargetCareer("Full Stack Developer");
        student1.setBio("Aspiring full-stack engineer passionate about React, Spring Boot, and cloud architecture.");
        student1.setGithubUrl("https://github.com/aaravpatel");
        student1.setLinkedinUrl("https://linkedin.com/in/aaravpatel");
        student1.setPortfolioUrl("https://aaravpatel.dev");
        student1.setCareerReadinessScore(78);
        student1.setTechnicalSkillScore(82);
        student1.setDsaScore(68);
        student1.setProjectsScore(75);
        student1.setAcademicScore(88);
        student1.setResumeScore(82);
        student1.setInterviewScore(65);
        student1.setCertificationsScore(70);
        student1.setAttendancePercentage(BigDecimal.valueOf(89.50));
        studentProfileRepository.save(student1);

        // 4. Subjects
        Subject s1 = new Subject();
        s1.setCode("CS301");
        s1.setName("Data Structures & Algorithms");
        s1.setDepartment("Computer Science & Engineering");
        s1.setSemester(5);
        s1.setCredits(4);
        s1.setFaculty(faculty1);
        subjectRepository.save(s1);

        // 5. Projects
        Project p1 = new Project();
        p1.setTitle("AI Resume & ATS Intelligence Engine");
        p1.setDescription("Full-stack AI SaaS that parses resumes in PDF/DOCX format, extracts candidate skill ontologies, and scores ATS compliance.");
        p1.setCategory("AI_ML");
        p1.setTechStack("[\"FastAPI\", \"Python\", \"React\", \"PostgreSQL\"]");
        p1.setDifficulty("INTERMEDIATE");
        p1.setTeamSize(3);
        p1.setGithubUrl("https://github.com/campusiq/resume-ai");
        p1.setDemoUrl("https://resume.campusiq.edu");
        p1.setStatus("COMPLETED");
        p1.setCreatedBy(studentUser1);
        projectRepository.save(p1);

        // 6. Coding Problems
        CodingProblem cp1 = new CodingProblem();
        cp1.setTitle("Two Sum Target Index");
        cp1.setSlug("two-sum");
        cp1.setTopic("ARRAYS");
        cp1.setDifficulty("EASY");
        cp1.setDescription("Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.");
        cp1.setInputFormat("nums = [2,7,11,15], target = 9");
        cp1.setOutputFormat("[0,1]");
        cp1.setConstraints("2 <= nums.length <= 10^4");
        codingProblemRepository.save(cp1);

        // 7. Hackathons
        Hackathon h1 = new Hackathon();
        h1.setName("Smart India Hackathon 2026");
        h1.setOrganizer("Ministry of Education & AICTE");
        h1.setDescription("Nationwide digital initiative solving real-world challenges across education, health, smart cities, and AI.");
        h1.setDateStart(LocalDateTime.now().plusDays(14));
        h1.setDateEnd(LocalDateTime.now().plusDays(16));
        h1.setRegistrationDeadline(LocalDateTime.now().plusDays(5));
        h1.setLocation("New Delhi & Virtual");
        h1.setMode("HYBRID");
        h1.setPrizePool("₹1,00,000 per problem");
        h1.setRegistrationUrl("https://sih.gov.in");
        h1.setBannerUrl("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600");
        hackathonRepository.save(h1);

        // 8. Placement Applications
        PlacementApplication pa1 = new PlacementApplication();
        pa1.setStudent(student1);
        pa1.setCompanyName("Google India");
        pa1.setRoleTitle("Associate Software Engineer");
        pa1.setCtcLpa(BigDecimal.valueOf(28.50));
        pa1.setLocation("Bangalore / Hyderabad");
        pa1.setAppliedDate(LocalDate.now().minusDays(25));
        pa1.setStatus("TECHNICAL_INTERVIEW");
        pa1.setNotes("Passed initial OA. Round 2 Technical scheduled for System Design & Coding.");
        pa1.setInterviewDate(LocalDateTime.now().plusDays(3));
        placementApplicationRepository.save(pa1);
    }
}
