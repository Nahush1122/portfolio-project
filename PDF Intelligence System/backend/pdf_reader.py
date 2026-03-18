from __future__ import annotations

from io import BytesIO

from pypdf import PdfReader


class PDFExtractionError(Exception):
    """Raised when the uploaded file cannot be processed as a text-based PDF."""


def extract_text_from_pdf(file_bytes: bytes) -> tuple[str, int]:
    """Extract text from a PDF byte stream and return the text and page count."""
    try:
        reader = PdfReader(BytesIO(file_bytes))
    except Exception as exc:  # pragma: no cover - depends on parser internals
        raise PDFExtractionError("The uploaded file is not a valid PDF.") from exc

    pages_text: list[str] = []

    for page in reader.pages:
        page_text = page.extract_text() or ""
        cleaned = page_text.strip()
        if cleaned:
            pages_text.append(cleaned)

    full_text = "\n\n".join(pages_text).strip()

    if not full_text:
        raise PDFExtractionError(
            "No readable text was found in this PDF. It may be scanned or image-only."
        )

    return full_text, len(reader.pages)
