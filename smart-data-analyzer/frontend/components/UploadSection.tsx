"use client";

type UploadSectionProps = {
  selectedFile: File | null;
  loading: boolean;
  onFileChange: (file: File | null) => void;
  onUpload: () => void;
};

export function UploadSection({
  selectedFile,
  loading,
  onFileChange,
  onUpload
}: UploadSectionProps) {
  return (
    <section className="panel p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Upload CSV</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">Analyze your dataset in one step</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Upload a CSV file to generate dataset previews, summary statistics, missing value reports, correlation analysis, and visual charts.
          </p>
        </div>
        <button
          onClick={onUpload}
          disabled={!selectedFile || loading}
          className="rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? "Processing..." : "Upload & Analyze"}
        </button>
      </div>

      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-10 text-center transition hover:border-aqua hover:bg-cyan-50">
        <span className="text-lg font-semibold text-ink">Drop a CSV here or click to browse</span>
        <span className="mt-2 text-sm text-slate-500">Only CSV files are supported</span>
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
        />
      </label>

      <div className="mt-4 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-200">
        Selected file: <span className="font-semibold text-white">{selectedFile?.name ?? "None yet"}</span>
      </div>
    </section>
  );
}
