import { ProjectLauncherPage } from "@/components/project-launcher-page";
import { resumeAnalyzerLauncher } from "@/lib/project-launchers";

export default function ResumeAnalyzerPage() {
  return <ProjectLauncherPage project={resumeAnalyzerLauncher} />;
}
