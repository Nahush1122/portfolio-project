"use client";

import { useState } from "react";
import { AnswerPanel } from "@/components/AnswerPanel";
import { DashboardShell } from "@/components/DashboardShell";
import { SummaryPanel } from "@/components/SummaryPanel";
import { TopicsPanel } from "@/components/TopicsPanel";
import { UploadPanel } from "@/components/UploadPanel";
import { askQuestion, getSummary, getTopics, uploadPdf } from "@/lib/api";

type UploadStats = {
  pageCount: number;
  characterCount: number;
};

export default function Home() {
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [stats, setStats] = useState<UploadStats | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [summary, setSummary] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [evidence, setEvidence] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  async function handleUpload(file: File) {
    setUploading(true);
    setMessage(null);

    try {
      const result = await uploadPdf(file);
      setDocumentId(result.document_id);
      setFileName(result.filename);
      setStats({
        pageCount: result.page_count,
        characterCount: result.character_count
      });
      setSummary([]);
      setTopics([]);
      setQuestion("");
      setAnswer(null);
      setEvidence([]);
      setMessage(result.message);

      const [nextSummary, nextTopics] = await Promise.all([
        getSummary(result.document_id),
        getTopics(result.document_id)
      ]);

      setSummary(nextSummary);
      setTopics(nextTopics);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to upload the PDF.");
    } finally {
      setUploading(false);
    }
  }

  async function refreshSummary() {
    if (!documentId) {
      setMessage("Upload a PDF before generating a summary.");
      return;
    }

    setLoadingSummary(true);
    try {
      const nextSummary = await getSummary(documentId);
      setSummary(nextSummary);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to generate summary.");
    } finally {
      setLoadingSummary(false);
    }
  }

  async function refreshTopics() {
    if (!documentId) {
      setMessage("Upload a PDF before extracting topics.");
      return;
    }

    setLoadingTopics(true);
    try {
      const nextTopics = await getTopics(documentId);
      setTopics(nextTopics);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to extract topics.");
    } finally {
      setLoadingTopics(false);
    }
  }

  async function handleAsk() {
    if (!documentId) {
      setMessage("Upload a PDF before asking questions.");
      return;
    }

    if (!question.trim()) {
      setMessage("Enter a question about the uploaded document.");
      return;
    }

    setLoadingAnswer(true);
    try {
      const result = await askQuestion(documentId, question);
      setAnswer(result.answer);
      setEvidence(result.evidence);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to answer your question.");
    } finally {
      setLoadingAnswer(false);
    }
  }

  return (
    <DashboardShell>
      <div className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <div className="space-y-6">
          <UploadPanel
            onUpload={handleUpload}
            loading={uploading}
            message={message}
            fileName={fileName}
            stats={stats}
          />
          <AnswerPanel
            question={question}
            answer={answer}
            evidence={evidence}
            loading={loadingAnswer}
            disabled={!documentId}
            onQuestionChange={setQuestion}
            onAsk={handleAsk}
          />
        </div>
        <div className="space-y-6">
          <SummaryPanel
            summary={summary}
            loading={loadingSummary || uploading}
            disabled={!documentId}
            onRefresh={refreshSummary}
          />
          <TopicsPanel
            topics={topics}
            loading={loadingTopics || uploading}
            disabled={!documentId}
            onRefresh={refreshTopics}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
