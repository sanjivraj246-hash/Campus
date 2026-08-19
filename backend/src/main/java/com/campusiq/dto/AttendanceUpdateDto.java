package com.campusiq.dto;

import jakarta.validation.constraints.NotNull;

public class AttendanceUpdateDto {

    @NotNull
    private Long studentId;

    @NotNull
    private Long subjectId;

    @NotNull
    private Integer totalClasses;

    @NotNull
    private Integer attendedClasses;

    public AttendanceUpdateDto() {}

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getSubjectId() { return subjectId; }
    public void setSubjectId(Long subjectId) { this.subjectId = subjectId; }

    public Integer getTotalClasses() { return totalClasses; }
    public void setTotalClasses(Integer totalClasses) { this.totalClasses = totalClasses; }

    public Integer getAttendedClasses() { return attendedClasses; }
    public void setAttendedClasses(Integer attendedClasses) { this.attendedClasses = attendedClasses; }
}
