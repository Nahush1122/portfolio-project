from __future__ import annotations

import logging
import os

import uvicorn
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from resume_reader import extract_text
from scoring import score_resume
from skill_extractor import analyze_resume


class AnalyzeRequest(BaseModel):
    text: str


app = FastAPI(title="Resume Intelligence Analyzer API")
logger = logging.getLogger("resume_intelligence_analyzer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home() -> dict[str, str]:
    return {"status": "API is running"}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    _request,
    exc: RequestValidationError,
) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Invalid request data.",
            "errors": exc.errors(),
        },
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(_request, exc: HTTPException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled server error for %s", request.url.path, exc_info=exc)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error. Please try again later."},
    )


@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)) -> dict[str, str]:
    if not file.filename:
        raise HTTPException(status_code=400, detail="A file name is required.")

    if not file.filename.lower().endswith((".pdf", ".docx")):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")

    try:
        file_bytes = await file.read()
        text = extract_text(file.filename, file_bytes)
        return {
            "filename": file.filename,
            "text": text,
        }
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Failed to process the uploaded file.") from exc


@app.post("/analyze")
def analyze_resume_endpoint(payload: AnalyzeRequest) -> dict[str, object]:
    text = payload.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Resume text is required for analysis.")

    signals = analyze_resume(text)
    scoring = score_resume(
        text=text,
        skills=signals.skills,
        education_present=signals.education_present,
        experience_present=signals.experience_present,
        projects_present=signals.projects_present,
    )

    return {
        "detected_skills": signals.skills,
        "experience_estimation": signals.estimated_years,
        "resume_score": scoring["score"],
        "score_message": scoring["message"],
        "candidate_summary": scoring["message"] if scoring["override"] else signals.summary,
        "signals": {
            "education_present": signals.education_present,
            "experience_present": signals.experience_present,
            "projects_present": signals.projects_present,
        },
        "override_applied": scoring["override"],
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", "8002")))
