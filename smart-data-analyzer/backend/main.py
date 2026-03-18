from __future__ import annotations

from fastapi.middleware.cors import CORSMiddleware
from io import StringIO
import os
from typing import Any
from uuid import uuid4

import pandas as pd
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn

from analysis import analyze_dataset, preview_dataset
from visualization import generate_visualizations


app = FastAPI(title="Smart Data Analyzer API", version="1.0.0")

# Allow browser clients from any origin, which is a common deployment setup on Render
# when the frontend and backend may be served from different domains.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Keep uploaded datasets in memory so the analysis and visualization endpoints
# can reuse the same parsed dataframe after the initial upload.
DATASET_STORE: dict[str, pd.DataFrame] = {}


class DatasetRequest(BaseModel):
    dataset_id: str


def get_dataset_or_404(dataset_id: str) -> pd.DataFrame:
    dataset = DATASET_STORE.get(dataset_id)
    if dataset is None:
        raise HTTPException(status_code=404, detail="Dataset not found. Upload the file again.")
    return dataset


def parse_csv(contents: bytes) -> pd.DataFrame:
    if not contents:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")

    try:
        decoded = contents.decode("utf-8")
        dataframe = pd.read_csv(StringIO(decoded))
    except UnicodeDecodeError:
        try:
            decoded = contents.decode("latin-1")
            dataframe = pd.read_csv(StringIO(decoded))
        except Exception as exc:
            raise HTTPException(status_code=400, detail=f"Unable to parse CSV: {exc}") from exc
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Unable to parse CSV: {exc}") from exc

    if dataframe.empty:
        raise HTTPException(status_code=400, detail="The uploaded CSV is empty.")

    return dataframe


@app.get("/")
def home() -> dict[str, str]:
    return {"status": "API is running"}


@app.exception_handler(HTTPException)
async def http_exception_handler(_, exc: HTTPException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail},
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={
            "error": "Request validation failed.",
            "details": exc.errors(),
        },
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(_, exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={"error": f"Internal server error: {exc}"},
    )


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)) -> dict[str, Any]:
    content_type = (file.content_type or "").lower()
    valid_content_types = {"text/csv", "application/csv", "application/vnd.ms-excel", ""}
    if not file.filename or not file.filename.lower().endswith(".csv") or content_type not in valid_content_types:
        raise HTTPException(status_code=400, detail="Please upload a valid CSV file.")

    contents = await file.read()
    dataframe = parse_csv(contents)
    dataset_id = str(uuid4())
    DATASET_STORE[dataset_id] = dataframe

    return {
        "dataset_id": dataset_id,
        "filename": file.filename,
        "preview": preview_dataset(dataframe),
        "columns": dataframe.columns.tolist(),
    }


@app.post("/analyze")
def analyze(request: DatasetRequest) -> dict[str, Any]:
    dataframe = get_dataset_or_404(request.dataset_id)
    analysis = analyze_dataset(dataframe)
    charts = generate_visualizations(dataframe)
    return {
        "dataset_id": request.dataset_id,
        **analysis,
        "charts": charts,
    }


@app.post("/visualize")
def visualize(request: DatasetRequest) -> dict[str, Any]:
    dataframe = get_dataset_or_404(request.dataset_id)
    return {
        "dataset_id": request.dataset_id,
        "charts": generate_visualizations(dataframe),
    }


if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
