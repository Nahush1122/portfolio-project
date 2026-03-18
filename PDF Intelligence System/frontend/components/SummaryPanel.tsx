type SummaryPanelProps = {
  summary: string[];
  loading: boolean;
  disabled: boolean;
  onRefresh: () => Promise<void>;
};

export function SummaryPanel({
  summary,
  loading,
  disabled,
  onRefresh
}: SummaryPanelProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-panel p-6 shadow-panel">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Document Summary</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Extractive summary generated from the most informative sentences in the PDF.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void onRefresh()}
          disabled={disabled || loading}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {summary.length ? (
        <ul className="mt-6 space-y-3">
          {summary.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
            >
              <span className="mr-2 font-semibold text-accent">{index + 1}.</span>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500">
          Upload a document, then generate a 5 to 10 point summary here.
        </div>
      )}
    </section>
  );
}
