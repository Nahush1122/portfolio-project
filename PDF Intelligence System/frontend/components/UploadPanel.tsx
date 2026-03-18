type UploadPanelProps = {
  onUpload: (file: File) => Promise<void>;
  loading: boolean;
  message: string | null;
  fileName: string | null;
  stats: {
    pageCount: number;
    characterCount: number;
  } | null;
};

export function UploadPanel({
  onUpload,
  loading,
  message,
  fileName,
  stats
}: UploadPanelProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-panel p-6 shadow-panel">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Upload PDF</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Choose a text-based PDF to extract content and generate insights.
          </p>
        </div>
        {fileName ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Active file: <span className="font-medium text-ink">{fileName}</span>
          </div>
        ) : null}
      </div>

      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center transition hover:border-accent hover:bg-teal-50">
        <div className="text-lg font-medium text-ink">
          {loading ? "Processing your PDF..." : "Click to upload a PDF"}
        </div>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          The backend extracts text, then prepares the document for summary, topic
          detection, and question answering.
        </p>
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (file) {
              await onUpload(file);
              event.target.value = "";
            }
          }}
        />
      </label>

      {message ? (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {message}
        </div>
      ) : null}

      {stats ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-ink p-4 text-white">
            <div className="text-sm uppercase tracking-[0.2em] text-slate-300">Pages</div>
            <div className="mt-2 text-3xl font-semibold">{stats.pageCount}</div>
          </div>
          <div className="rounded-2xl bg-accent p-4 text-white">
            <div className="text-sm uppercase tracking-[0.2em] text-teal-100">Characters</div>
            <div className="mt-2 text-3xl font-semibold">{stats.characterCount}</div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
