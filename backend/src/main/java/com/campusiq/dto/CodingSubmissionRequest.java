package com.campusiq.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CodingSubmissionRequest {

    @NotNull
    private Long problemId;

    @NotBlank
    private String language;

    @NotBlank
    private String submittedCode;

    public CodingSubmissionRequest() {}

    public Long getProblemId() { return problemId; }
    public void setProblemId(Long problemId) { this.problemId = problemId; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getSubmittedCode() { return submittedCode; }
    public void setSubmittedCode(String submittedCode) { this.submittedCode = submittedCode; }
}
