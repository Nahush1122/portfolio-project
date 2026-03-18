import { ProjectLauncherPage } from "@/components/project-launcher-page";
import { pdfIntelligenceLauncher } from "@/lib/project-launchers";

export default function PdfIntelligencePage() {
  return <ProjectLauncherPage project={pdfIntelligenceLauncher} />;
}
