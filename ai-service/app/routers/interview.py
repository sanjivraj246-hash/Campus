from fastapi import APIRouter
from typing import List
from app.models.schemas import (
    InterviewGenerateRequest, InterviewQuestion,
    InterviewEvaluateRequest, InterviewEvaluateResponse
)
from app.services.heuristics import generate_interview_questions, evaluate_interview_answer

router = APIRouter(prefix="/api/ai/interview", tags=["AI Interview Simulator"])

@router.post("/generate-questions", response_model=List[InterviewQuestion])
async def generate_questions(request: InterviewGenerateRequest):
    return generate_interview_questions(
        mode=request.mode,
        target_role=request.target_role,
        question_count=request.question_count or 5
    )

@router.post("/evaluate-answer", response_model=InterviewEvaluateResponse)
async def evaluate_answer(request: InterviewEvaluateRequest):
    return evaluate_interview_answer(
        question=request.question,
        category=request.category,
        student_answer=request.student_answer,
        target_role=request.target_role
    )
