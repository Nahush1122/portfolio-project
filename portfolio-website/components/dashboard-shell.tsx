import Link from "next/link";

type DashboardShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  children: React.ReactNode;
};

const navigation = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/ai-tools-lab", label: "AI Tools Lab" },
  { href: "/server-status", label: "Server Status" },
  { href: "/contact", label: "Contact" },
];

export function DashboardShell({
  title,
  eyebrow,
  description,
  children,
}: DashboardShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="glass-panel rounded-[28px] px-6 py-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/75">
                {eyebrow}
              </p>
              <div className="space-y-2">
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {title}
                </h1>
                <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                  {description}
                </p>
              </div>
            </div>

            <nav className="flex flex-wrap gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
