import { ReactNode } from "react";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-mesh px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 overflow-hidden rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-panel backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                AI Document Analysis
              </span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                PDF Intelligence System
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                Upload a PDF once, then explore its summary, major themes, and grounded
                answers from a single workspace.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-2xl font-semibold text-ink">FastAPI</div>
                <div>Extraction and analysis API</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-2xl font-semibold text-ink">Next.js</div>
                <div>Interactive AI dashboard</div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
