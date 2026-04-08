import Link from "next/link";

type TileCardProps = {
  href: string;
  title: string;
  description: string;
  stat: string;
  accent: string;
  external?: boolean;
};

export function TileCard({
  href,
  title,
  description,
  stat,
  accent,
  external = false,
}: TileCardProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      className="glass-panel grid-glow group relative flex min-h-[220px] flex-col justify-between rounded-[28px] border border-white/10 p-6 shadow-[0_16px_40px_rgba(5,12,24,0.24)] transition duration-300 ease-in-out hover:-translate-y-1.5 hover:scale-105 hover:border-cyan-300/35 hover:bg-white/10 hover:shadow-[0_28px_65px_rgba(8,18,36,0.34)]"
    >
      <div
        className="absolute inset-x-6 top-0 h-px opacity-70"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />

      <div className="space-y-4">
        <span
          className="inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.28em]"
          style={{ borderColor: `${accent}66`, color: accent }}
        >
          Dashboard Tile
        </span>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
          <p className="text-sm leading-7 text-slate-300">{description}</p>
        </div>
      </div>

      <div className="mt-8 flex items-end justify-between">
        <p className="text-sm font-medium text-slate-300">{stat}</p>
        <span className="text-sm font-medium text-cyan-200 transition group-hover:translate-x-1">
          Explore →
        </span>
      </div>
    </Link>
  );
}
