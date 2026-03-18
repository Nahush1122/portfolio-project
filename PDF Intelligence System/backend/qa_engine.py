from __future__ import annotations

import re
from dataclasses import dataclass

from summarizer import STOPWORDS, tokenize_words


CHUNK_SPLIT_PATTERN = re.compile(r"\n{2,}")


@dataclass
class AnswerResult:
    answer: str
    evidence: list[str]


def _split_chunks(text: str, chunk_size: int = 700) -> list[str]:
    paragraphs = [paragraph.strip() for paragraph in CHUNK_SPLIT_PATTERN.split(text) if paragraph.strip()]
    chunks: list[str] = []

    for paragraph in paragraphs:
        if len(paragraph) <= chunk_size:
            chunks.append(paragraph)
            continue

        start = 0
        while start < len(paragraph):
            chunks.append(paragraph[start : start + chunk_size].strip())
            start += chunk_size

    return chunks


def _score_chunk(chunk: str, query_terms: set[str]) -> float:
    chunk_terms = tokenize_words(chunk)
    if not chunk_terms or not query_terms:
        return 0.0

    overlap = sum(1 for token in chunk_terms if token in query_terms)
    return overlap / len(chunk_terms)


def answer_question(text: str, question: str) -> AnswerResult:
    query_terms = {
        token for token in tokenize_words(question) if token not in STOPWORDS and len(token) > 2
    }

    if not query_terms:
        return AnswerResult(
            answer="Please ask a more specific question so I can locate the right passage.",
            evidence=[],
        )

    chunks = _split_chunks(text)
    scored_chunks = [(chunk, _score_chunk(chunk, query_terms)) for chunk in chunks]
    ranked = sorted(scored_chunks, key=lambda item: item[1], reverse=True)
    best_matches = [chunk for chunk, score in ranked[:3] if score > 0]

    if not best_matches:
        return AnswerResult(
            answer="I could not find a strong match for that question in the uploaded document.",
            evidence=[],
        )

    best_chunk = best_matches[0]
    sentences = re.split(r"(?<=[.!?])\s+", best_chunk)
    relevant_sentences = [
        sentence.strip()
        for sentence in sentences
        if any(term in tokenize_words(sentence) for term in query_terms)
    ]

    if not relevant_sentences:
        relevant_sentences = [best_chunk.strip()]

    answer = " ".join(relevant_sentences[:3])
    return AnswerResult(answer=answer, evidence=best_matches)
