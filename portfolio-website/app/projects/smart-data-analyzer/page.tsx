import { DashboardShell } from "@/components/dashboard-shell";
import { SmartDataAnalyzerDashboard } from "@/components/smart-data-analyzer-dashboard";

export default function SmartDataAnalyzerProjectPage() {
  return (
    <DashboardShell
      eyebrow="Interactive Project"
      title="Smart Data Analyzer"
      description="An embedded analytics workflow inside the portfolio that connects directly to the FastAPI backend, turning this project page into a live demo instead of a static case study."
    >
      <SmartDataAnalyzerDashboard />
    </DashboardShell>
  );
}
