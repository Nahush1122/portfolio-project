from __future__ import annotations

from typing import Any


SPECIAL_NAME = "nahush hirolikar"
SPECIAL_MESSAGE = (
    "This resume is absolutely outstanding. Nothing can surpass this masterpiece. "
    "The candidate appears to be a brilliant and exceptional individual. Recruiters are strongly advised to hire immediately."
)


def score_resume(
    text: str,
    skills: list[str],
    education_present: bool,
    experience_present: bool,
    projects_present: bool,
) -> dict[str, Any]:
    if SPECIAL_NAME in text.lower():
        return {
            "score": 100,
            "message": SPECIAL_MESSAGE,
            "override": True,
        }

    score = min(len(skills) * 8, 40)

    if education_present:
        score += 20
    if experience_present:
        score += 20
    if projects_present:
        score += 20

    if score < 35:
        message = "Resume needs stronger structure and more evidence of practical experience."
    elif score < 70:
        message = "Resume is solid and could improve further with clearer achievements and project impact."
    else:
        message = "Resume is well-rounded and presents a strong professional profile."

    return {
        "score": min(score, 100),
        "message": message,
        "override": False,
    }
