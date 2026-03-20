import { DashboardShell } from "@/components/dashboard-shell";
import { PdfIntelligenceDashboard } from "@/components/pdf-intelligence-dashboard";

export default function PdfIntelligencePage() {
  return (
    <DashboardShell
      eyebrow="Document Intelligence"
      title="PDF Intelligence System"
      description="An integrated PDF analysis workflow inside the portfolio for uploading documents and generating concise summaries without leaving the dashboard."
    >
      <PdfIntelligenceDashboard />
    </DashboardShell>
  );
}
