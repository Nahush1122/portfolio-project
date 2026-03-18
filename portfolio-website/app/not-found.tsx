import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";

export default function NotFound() {
  return (
    <DashboardShell
      eyebrow="404"
      title="This route is not on the dashboard."
      description="The page you requested does not exist, but the rest of the portfolio is still available."
    >
      <div className="glass-panel rounded-[28px] p-8">
        <Link
          href="/"
          className="inline-flex rounded-full bg-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
        >
          Return Home
        </Link>
      </div>
    </DashboardShell>
  );
}
