type InsightsSummaryProps = {
  insights: string[];
};

export function InsightsSummary({ insights }: InsightsSummaryProps) {
  return (
    <section className="panel p-6">
      <h3 className="text-xl font-semibold text-ink">Insights Summary</h3>
      <div className="mt-5 space-y-3">
        {insights.length > 0 ? (
          insights.map((insight, index) => (
            <div key={index} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-700">
              {insight}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">Insights will appear once the dataset is analyzed.</p>
        )}
      </div>
    </section>
  );
}
