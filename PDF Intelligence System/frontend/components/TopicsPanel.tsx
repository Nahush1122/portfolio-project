type TopicsPanelProps = {
  topics: string[];
  loading: boolean;
  disabled: boolean;
  onRefresh: () => Promise<void>;
};

export function TopicsPanel({
  topics,
  loading,
  disabled,
  onRefresh
}: TopicsPanelProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-panel p-6 shadow-panel">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Key Topics</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Important keywords extracted from repeated high-signal terms in the document.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void onRefresh()}
          disabled={disabled || loading}
          className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? "Analyzing..." : "Extract"}
        </button>
      </div>

      {topics.length ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-900"
            >
              {topic}
            </span>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500">
          Topic extraction results will appear here after upload.
        </div>
      )}
    </section>
  );
}
