import Image from "next/image";

type ProjectAssetCardProps = {
  title: string;
  description: string;
  src: string;
};

export function ProjectAssetCard({
  title,
  description,
  src,
}: ProjectAssetCardProps) {
  return (
    <div className="glass-panel rounded-[28px] p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-400">{description}</p>
      </div>

      <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white">
        <Image
          src={src}
          alt={title}
          width={1200}
          height={900}
          className="h-auto w-full object-contain"
        />
      </div>
    </div>
  );
}
