from __future__ import annotations

import os
from typing import Dict
from uuid import uuid4

import uvicorn
from fastapi import FastAPI, File, HTTPException, Request, UploadFile
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

from pdf_reader import PDFExtractionError, extract_text_from_pdf
from qa_engine import answer_question
from summarizer import extract_topics, generate_summary

app = FastAPI(title="PDF Intelligence System API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DOCUMENT_STORE: Dict[str, dict] = {}


class DocumentRequest(BaseModel):
    document_id: str = Field(..., description="The document identifier returned by /upload")


class QuestionRequest(DocumentRequest):
    question: str = Field(..., min_length=3, description="User question about the document")


def get_document(document_id: str) -> dict:
    document = DOCUMENT_STORE.get(document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found. Upload a PDF first.")
    return document


@app.exception_handler(HTTPException)
async def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"status": "error", "message": exc.detail},
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    _: Request, exc: RequestValidationError
) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={
            "status": "error",
            "message": "Request validation failed.",
            "detail": exc.errors(),
        },
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(_: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={
            "status": "error",
            "message": "An unexpected server error occurred.",
        },
    )


@app.get("/")
def home() -> dict[str, str]:
    return {"status": "API is running"}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)) -> dict:
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    file_bytes = await file.read()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="The uploaded PDF is empty.")

    try:
        text, page_count = extract_text_from_pdf(file_bytes)
    except PDFExtractionError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    document_id = str(uuid4())
    DOCUMENT_STORE[document_id] = {
        "filename": file.filename,
        "text": text,
        "page_count": page_count,
    }

    return {
        "document_id": document_id,
        "filename": file.filename,
        "page_count": page_count,
        "character_count": len(text),
        "message": "PDF uploaded and processed successfully.",
    }


@app.post("/summary")
def create_summary(request: DocumentRequest) -> dict:
    document = get_document(request.document_id)
    summary = generate_summary(document["text"])
    return {"document_id": request.document_id, "summary": summary}


@app.post("/topics")
def create_topics(request: DocumentRequest) -> dict:
    document = get_document(request.document_id)
    topics = extract_topics(document["text"])
    return {"document_id": request.document_id, "topics": topics}


@app.post("/ask")
def ask_question(request: QuestionRequest) -> dict:
    document = get_document(request.document_id)
    result = answer_question(document["text"], request.question)
    return {
        "document_id": request.document_id,
        "question": request.question,
        "answer": result.answer,
        "evidence": result.evidence,
    }


if __name__ == "__main__":
    port = int(os.getenv("PORT", "8001"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
