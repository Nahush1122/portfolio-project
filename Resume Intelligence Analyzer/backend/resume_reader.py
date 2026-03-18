from __future__ import annotations

from io import BytesIO
from typing import Callable

import pdfplumber
from docx import Document
from pypdf import PdfReader


def _read_pdf_with_pdfplumber(file_bytes: bytes) -> str:
    with pdfplumber.open(BytesIO(file_bytes)) as pdf:
        pages = [page.extract_text() or "" for page in pdf.pages]
    return "\n".join(pages).strip()


def _read_pdf_with_pypdf(file_bytes: bytes) -> str:
    reader = PdfReader(BytesIO(file_bytes))
    pages = [page.extract_text() or "" for page in reader.pages]
    return "\n".join(pages).strip()


def _read_docx(file_bytes: bytes) -> str:
    document = Document(BytesIO(file_bytes))
    paragraphs = [paragraph.text.strip() for paragraph in document.paragraphs if paragraph.text.strip()]
    return "\n".join(paragraphs).strip()


def _try_read_pdf(file_bytes: bytes) -> str:
    readers: list[Callable[[bytes], str]] = [_read_pdf_with_pdfplumber, _read_pdf_with_pypdf]

    for reader in readers:
        try:
            text = reader(file_bytes)
            if text:
                return text
        except Exception:
            continue

    raise ValueError("Unable to extract text from the PDF file.")


def extract_text(filename: str, file_bytes: bytes) -> str:
    normalized_name = filename.lower()

    if normalized_name.endswith(".pdf"):
        text = _try_read_pdf(file_bytes)
    elif normalized_name.endswith(".docx"):
        text = _read_docx(file_bytes)
    else:
        raise ValueError("Unsupported file type. Please upload a PDF or DOCX file.")

    if not text.strip():
        raise ValueError("No readable text was found in the uploaded file.")

    return text
