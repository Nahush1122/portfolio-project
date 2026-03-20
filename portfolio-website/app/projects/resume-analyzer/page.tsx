import { DashboardShell } from "@/components/dashboard-shell";
import { ResumeAnalyzerDashboard } from "@/components/resume-analyzer-dashboard";

export default function ResumeAnalyzerPage() {
  return (
    <DashboardShell
      eyebrow="Resume Intelligence"
      title="Resume Intelligence Analyzer"
      description="An integrated resume-analysis workflow inside the portfolio for extracting summary insights, skills, and improvement suggestions from uploaded resumes."
    >
      <ResumeAnalyzerDashboard />
    </DashboardShell>
  );
}
