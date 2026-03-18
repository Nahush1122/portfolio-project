from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any

import spacy


SKILL_PATTERNS = {
    "Python": [r"\bpython\b"],
    "SQL": [r"\bsql\b", r"\bpostgresql\b", r"\bmysql\b"],
    "Machine Learning": [r"\bmachine learning\b", r"\bml\b"],
    "Data Analysis": [r"\bdata analysis\b", r"\bdata analyst\b", r"\banalytics\b"],
    "Data Visualization": [r"\bdata visualization\b", r"\bvisuali[sz]ation\b", r"\bpower bi\b", r"\btableau\b"],
    "JavaScript": [r"\bjavascript\b", r"\bjs\b"],
    "React": [r"\breact\b", r"\bnext\.?js\b"],
    "Excel": [r"\bexcel\b", r"\bmicrosoft excel\b"],
    "Statistics": [r"\bstatistics\b", r"\bstatistical\b"],
}

EDUCATION_PATTERNS = [
    r"\beducation\b",
    r"\bbachelor(?:'s)?\b",
    r"\bmaster(?:'s)?\b",
    r"\bdegree\b",
    r"\bb\.tech\b",
    r"\bm\.tech\b",
    r"\bb\.e\b",
    r"\bm\.s\b",
    r"\bb\.sc\b",
]

PROJECT_PATTERNS = [
    r"\bprojects?\b",
    r"\bportfolio\b",
    r"\bbuilt\b",
    r"\bdeveloped\b",
    r"\bimplemented\b",
]

EXPERIENCE_PATTERNS = [
    r"(?P<years>\d+)\+?\s+years?\s+(?:of\s+)?experience",
    r"experience\s+of\s+(?P<years>\d+)\+?\s+years?",
    r"worked\s+since\s+(?P<since>20\d{2})",
    r"working\s+since\s+(?P<since>20\d{2})",
    r"since\s+(?P<since>20\d{2})",
]


def _load_nlp() -> Any:
    try:
        return spacy.load("en_core_web_sm")
    except OSError:
        nlp = spacy.blank("en")
        if "sentencizer" not in nlp.pipe_names:
            nlp.add_pipe("sentencizer")
        return nlp


NLP = _load_nlp()


@dataclass
class ResumeSignals:
    skills: list[str]
    estimated_years: int | None
    education_present: bool
    experience_present: bool
    projects_present: bool
    summary: str


def detect_skills(text: str) -> list[str]:
    lower_text = text.lower()
    detected = []

    for skill, patterns in SKILL_PATTERNS.items():
        if any(re.search(pattern, lower_text) for pattern in patterns):
            detected.append(skill)

    return detected


def estimate_experience(text: str) -> int | None:
    lower_text = text.lower()

    for pattern in EXPERIENCE_PATTERNS:
        match = re.search(pattern, lower_text)
        if not match:
            continue

        if match.groupdict().get("years"):
            return int(match.group("years"))

        if match.groupdict().get("since"):
            since_year = int(match.group("since"))
            current_year = 2026
            if since_year <= current_year:
                return max(current_year - since_year, 0)

    return None


def has_education(text: str) -> bool:
    lower_text = text.lower()
    return any(re.search(pattern, lower_text) for pattern in EDUCATION_PATTERNS)


def has_projects(text: str) -> bool:
    lower_text = text.lower()
    return any(re.search(pattern, lower_text) for pattern in PROJECT_PATTERNS)


def build_summary(text: str, skills: list[str], estimated_years: int | None) -> str:
    doc = NLP(text)
    sentences = [sentence.text.strip() for sentence in doc.sents if sentence.text.strip()]

    if estimated_years is not None and skills:
        headline = (
            f"Candidate appears to have around {estimated_years} years of experience with strengths in "
            f"{', '.join(skills[:4])}."
        )
    elif skills:
        headline = f"Candidate profile highlights strengths in {', '.join(skills[:4])}."
    elif estimated_years is not None:
        headline = f"Candidate appears to have around {estimated_years} years of experience."
    else:
        headline = "Candidate profile shows a mix of experience and professional background details."

    supporting_sentence = ""
    for sentence in sentences:
        if len(sentence.split()) >= 8:
            supporting_sentence = sentence
            break

    return f"{headline} {supporting_sentence}".strip()


def analyze_resume(text: str) -> ResumeSignals:
    skills = detect_skills(text)
    estimated_years = estimate_experience(text)
    education_present = has_education(text)
    experience_present = estimated_years is not None or "experience" in text.lower()
    projects_present = has_projects(text)
    summary = build_summary(text, skills, estimated_years)

    return ResumeSignals(
        skills=skills,
        estimated_years=estimated_years,
        education_present=education_present,
        experience_present=experience_present,
        projects_present=projects_present,
        summary=summary,
    )
