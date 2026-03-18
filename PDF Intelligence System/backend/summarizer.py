from __future__ import annotations

import math
import re
from collections import Counter

STOPWORDS = {
    "a",
    "about",
    "above",
    "after",
    "again",
    "against",
    "all",
    "am",
    "an",
    "and",
    "any",
    "are",
    "as",
    "at",
    "be",
    "because",
    "been",
    "before",
    "being",
    "below",
    "between",
    "both",
    "but",
    "by",
    "can",
    "could",
    "did",
    "do",
    "does",
    "doing",
    "down",
    "during",
    "each",
    "few",
    "for",
    "from",
    "further",
    "had",
    "has",
    "have",
    "having",
    "he",
    "her",
    "here",
    "hers",
    "herself",
    "him",
    "himself",
    "his",
    "how",
    "i",
    "if",
    "in",
    "into",
    "is",
    "it",
    "its",
    "itself",
    "just",
    "me",
    "more",
    "most",
    "my",
    "myself",
    "no",
    "nor",
    "not",
    "now",
    "of",
    "off",
    "on",
    "once",
    "only",
    "or",
    "other",
    "our",
    "ours",
    "ourselves",
    "out",
    "over",
    "own",
    "same",
    "she",
    "should",
    "so",
    "some",
    "such",
    "than",
    "that",
    "the",
    "their",
    "theirs",
    "them",
    "themselves",
    "then",
    "there",
    "these",
    "they",
    "this",
    "those",
    "through",
    "to",
    "too",
    "under",
    "until",
    "up",
    "very",
    "was",
    "we",
    "were",
    "what",
    "when",
    "where",
    "which",
    "while",
    "who",
    "whom",
    "why",
    "will",
    "with",
    "you",
    "your",
    "yours",
    "yourself",
    "yourselves",
}

WORD_PATTERN = re.compile(r"\b[a-zA-Z][a-zA-Z0-9\-]{2,}\b")
SENTENCE_SPLIT_PATTERN = re.compile(r"(?<=[.!?])\s+")


def normalize_whitespace(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def tokenize_words(text: str) -> list[str]:
    return [token.lower() for token in WORD_PATTERN.findall(text)]


def split_sentences(text: str) -> list[str]:
    normalized = text.replace("\n", " ")
    sentences = [normalize_whitespace(item) for item in SENTENCE_SPLIT_PATTERN.split(normalized)]
    return [sentence for sentence in sentences if len(sentence.split()) >= 6]


def _word_scores(text: str) -> Counter:
    words = [word for word in tokenize_words(text) if word not in STOPWORDS]
    frequencies = Counter(words)
    if not frequencies:
        return Counter()

    max_frequency = max(frequencies.values())
    for word in list(frequencies.keys()):
        frequencies[word] = frequencies[word] / max_frequency
    return frequencies


def generate_summary(text: str, min_points: int = 5, max_points: int = 10) -> list[str]:
    sentences = split_sentences(text)
    if not sentences:
        return ["The document does not contain enough sentence-level text to summarize."]

    word_scores = _word_scores(text)
    ranked_sentences: list[tuple[float, int, str]] = []

    for index, sentence in enumerate(sentences):
        tokens = [word for word in tokenize_words(sentence) if word not in STOPWORDS]
        if not tokens:
            continue

        score = sum(word_scores.get(token, 0.0) for token in tokens)
        length_penalty = 1 + math.log(len(tokens) + 1, 10)
        ranked_sentences.append((score / length_penalty, index, sentence))

    if not ranked_sentences:
        return ["The document text was extracted, but it did not contain enough meaningful content."]

    target_points = min(max(min_points, len(sentences) // 8 or min_points), max_points)
    top_ranked = sorted(ranked_sentences, key=lambda item: item[0], reverse=True)[:target_points]
    ordered = [sentence for _, _, sentence in sorted(top_ranked, key=lambda item: item[1])]
    return [sentence.rstrip(".") for sentence in ordered]


def extract_topics(text: str, limit: int = 10) -> list[str]:
    words = [word for word in tokenize_words(text) if word not in STOPWORDS]
    if not words:
        return []

    counts = Counter(words)
    ranked = counts.most_common(limit * 3)
    topics: list[str] = []

    for word, _ in ranked:
        if word.isdigit() or len(word) < 4:
            continue
        if word not in topics:
            topics.append(word.title())
        if len(topics) >= limit:
            break

    return topics
