package com.campusiq.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "coding_problems")
public class CodingProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(nullable = false, length = 100)
    private String topic; // ARRAYS, STRINGS, LINKED_LISTS, STACK_QUEUE, TREES_GRAPHS, SORTING_SEARCHING, DYNAMIC_PROGRAMMING

    @Column(nullable = false, length = 50)
    private String difficulty; // EASY, MEDIUM, HARD

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "input_format", columnDefinition = "TEXT")
    private String inputFormat;

    @Column(name = "output_format", columnDefinition = "TEXT")
    private String outputFormat;

    @Column(columnDefinition = "TEXT")
    private String constraints;

    @Column(name = "sample_test_cases", columnDefinition = "TEXT")
    private String sampleTestCases = "[]";

    @Column(name = "default_starter_code", columnDefinition = "TEXT")
    private String defaultStarterCode = "{}";

    @Column(name = "acceptance_rate", precision = 5, scale = 2)
    private BigDecimal acceptanceRate = BigDecimal.valueOf(75.00);

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public CodingProblem() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getInputFormat() { return inputFormat; }
    public void setInputFormat(String inputFormat) { this.inputFormat = inputFormat; }

    public String getOutputFormat() { return outputFormat; }
    public void setOutputFormat(String outputFormat) { this.outputFormat = outputFormat; }

    public String getConstraints() { return constraints; }
    public void setConstraints(String constraints) { this.constraints = constraints; }

    public String getSampleTestCases() { return sampleTestCases; }
    public void setSampleTestCases(String sampleTestCases) { this.sampleTestCases = sampleTestCases; }

    public String getDefaultStarterCode() { return defaultStarterCode; }
    public void setDefaultStarterCode(String defaultStarterCode) { this.defaultStarterCode = defaultStarterCode; }

    public BigDecimal getAcceptanceRate() { return acceptanceRate; }
    public void setAcceptanceRate(BigDecimal acceptanceRate) { this.acceptanceRate = acceptanceRate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
