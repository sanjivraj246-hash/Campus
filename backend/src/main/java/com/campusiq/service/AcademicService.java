package com.campusiq.service;

import com.campusiq.model.AcademicRecord;
import com.campusiq.model.Subject;
import com.campusiq.repository.AcademicRecordRepository;
import com.campusiq.repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcademicService {

    private final AcademicRecordRepository academicRecordRepository;
    private final SubjectRepository subjectRepository;

    public AcademicService(AcademicRecordRepository academicRecordRepository, SubjectRepository subjectRepository) {
        this.academicRecordRepository = academicRecordRepository;
        this.subjectRepository = subjectRepository;
    }

    public List<AcademicRecord> getStudentRecords(Long studentId) {
        return academicRecordRepository.findByStudentId(studentId);
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }
}
