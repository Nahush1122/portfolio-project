import { DatasetPreview as DatasetPreviewType } from "@/lib/types";

type DatasetPreviewProps = {
  filename: string | null;
  preview: DatasetPreviewType | null;
};

export function DatasetPreview({ filename, preview }: DatasetPreviewProps) {
  if (!preview) {
    return (
      <section className="panel p-6">
        <h3 className="text-xl font-semibold text-ink">Dataset Preview</h3>
        <p className="mt-3 text-sm text-slate-500">Upload a CSV to inspect its first rows.</p>
      </section>
    );
  }

  return (
    <section className="panel overflow-hidden p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-ink">Dataset Preview</h3>
          <p className="text-sm text-slate-500">{filename}</p>
        </div>
        <p className="text-sm font-medium text-slate-600">
          {preview.shape.rows} rows • {preview.shape.columns} columns
        </p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
          <thead>
            <tr>
              {preview.columns.map((column) => (
                <th key={column} className="rounded-2xl bg-slate-100 px-4 py-3 font-semibold text-slate-700">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.rows.map((row, index) => (
              <tr key={index}>
                {preview.columns.map((column) => (
                  <td key={`${column}-${index}`} className="rounded-2xl bg-white px-4 py-3 text-slate-600">
                    {String(row[column] ?? "-")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
