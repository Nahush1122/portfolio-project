type AnswerPanelProps = {
  question: string;
  answer: string | null;
  evidence: string[];
  loading: boolean;
  disabled: boolean;
  onQuestionChange: (value: string) => void;
  onAsk: () => Promise<void>;
};

export function AnswerPanel({
  question,
  answer,
  evidence,
  loading,
  disabled,
  onQuestionChange,
  onAsk
}: AnswerPanelProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-panel p-6 shadow-panel">
      <div>
        <h2 className="text-2xl font-semibold text-ink">Question Answering</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Ask a question about the uploaded PDF and the system will return the most relevant
          grounded answer with supporting evidence.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <textarea
          value={question}
          onChange={(event) => onQuestionChange(event.target.value)}
          placeholder="Ask something like: What are the main findings in this document?"
          className="min-h-32 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none ring-0 transition placeholder:text-slate-400 focus:border-accent"
        />
        <button
          type="button"
          onClick={() => void onAsk()}
          disabled={disabled || loading}
          className="w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? "Searching document..." : "Ask Question"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr,1fr]">
        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Answer
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            {answer ?? "Your answer will appear here once you ask a question."}
          </p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Evidence
          </div>
          {evidence.length ? (
            <ul className="mt-3 space-y-3">
              {evidence.map((item, index) => (
                <li key={`${index}-${item.slice(0, 24)}`} className="text-sm leading-6 text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-7 text-slate-500">
              Supporting passages will be listed here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
