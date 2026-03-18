import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";

export default function ContactPage() {
  return (
    <DashboardShell
      eyebrow="Contact"
      title="Let’s connect for data, ML, and dashboard work."
      description="Whether you are hiring, looking for a project collaborator, or exploring consulting support, this page keeps the outreach flow simple and professional."
    >
      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Contact Channels
          </p>
          <div className="mt-5 space-y-4">
            <Link
              href="mailto:nahush.nsh@gmail.com"
              className="block rounded-[22px] border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/35 hover:bg-cyan-300/10"
            >
              <p className="text-sm text-slate-400">Email</p>
              <p className="mt-1 text-lg font-semibold text-white">nahush.nsh@gmail.com</p>
            </Link>
            <Link
              href="https://www.linkedin.com/in/nahush-hirolikar-14023538a/"
              target="_blank"
              className="block rounded-[22px] border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/35 hover:bg-cyan-300/10"
            >
              <p className="text-sm text-slate-400">LinkedIn</p>
              <p className="mt-1 text-lg font-semibold text-white">
                Nahush Hirolikar
              </p>
            </Link>
            <Link
              href="https://github.com/Nahush1122"
              target="_blank"
              className="block rounded-[22px] border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/35 hover:bg-cyan-300/10"
            >
              <p className="text-sm text-slate-400">GitHub</p>
              <p className="mt-1 text-lg font-semibold text-white">github.com/Nahush1122</p>
            </Link>
            <Link
              href="https://wa.me/+917758033676"
              target="_blank"
              className="block rounded-[22px] border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/35 hover:bg-cyan-300/10"
            >
              <p className="text-sm text-slate-400">Contact Mobile number</p>
              <p className="mt-1 text-lg font-semibold text-white">+91 7758033676</p>
            </Link>
          </div>
        </div>

        
      </section>
    </DashboardShell>
  );
}
