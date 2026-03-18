import {
  PDF_INTELLIGENCE_DEMO_URL,
  RESUME_ANALYZER_DEMO_URL,
} from "@/lib/runtime-config";

export type ProjectLauncher = {
  eyebrow: string;
  title: string;
  description: string;
  architecture: string[];
  technologies: string[];
  features: string[];
  launchUrl: string;
  launchLabel: string;
};

export const pdfIntelligenceLauncher: ProjectLauncher = {
  eyebrow: "Document Intelligence",
  title: "PDF Intelligence System",
  description:
    "A full-stack application for uploading PDFs, generating concise summaries, extracting important topics, and answering grounded questions from document content.",
  architecture: [
    "A Next.js frontend handles document upload and routes user actions into focused document-intelligence workflows.",
    "A FastAPI backend stores uploaded documents in memory and coordinates extraction, summarization, topic discovery, and question answering.",
    "Specialized backend modules process PDF text, generate summaries, extract topics, and return evidence-backed answers.",
  ],
  technologies: ["Next.js", "React", "FastAPI", "Python", "PDF Processing", "Tailwind CSS"],
  features: [
    "PDF upload and text extraction",
    "Concise document summaries",
    "Topic and keyword extraction",
    "Question answering with evidence snippets",
  ],
  launchUrl: PDF_INTELLIGENCE_DEMO_URL,
  launchLabel: "Launch Demo",
};

export const resumeAnalyzerLauncher: ProjectLauncher = {
  eyebrow: "Resume Intelligence",
  title: "Resume Intelligence Analyzer",
  description:
    "A full-stack resume analysis tool that uploads PDF or DOCX files and generates structured candidate insights including skills, experience estimation, scoring, and summary output.",
  architecture: [
    "A dedicated frontend handles resume upload and displays extracted signals without changing the original application experience.",
    "A FastAPI backend accepts PDF and DOCX resumes, extracts raw text, and passes it through analysis and scoring services.",
    "Resume analysis modules detect skills, estimate experience, compute a resume score, and generate a candidate summary.",
  ],
  technologies: ["Next.js", "React", "FastAPI", "Python", "spaCy", "Tailwind CSS"],
  features: [
    "PDF and DOCX resume upload",
    "Skill extraction for common technical profiles",
    "Experience estimation and resume scoring",
    "Candidate summary and signal breakdown",
  ],
  launchUrl: RESUME_ANALYZER_DEMO_URL,
  launchLabel: "Launch Demo",
};
