type SkillsDisplayProps = {
  skills: string[];
  experienceEstimation: number | null;
};

export function SkillsDisplay({
  skills,
  experienceEstimation,
}: SkillsDisplayProps) {
  return (
    <section className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-panel">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Skill Detection
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-ink">Detected capabilities</h3>
        </div>
        
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <span
              className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm"
              key={skill}
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No listed skills were detected in the uploaded resume.
          </p>
        )}
      </div>
    </section>
  );
}
