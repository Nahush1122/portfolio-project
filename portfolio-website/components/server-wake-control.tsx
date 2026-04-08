"use client";

type ServerWakeControlProps = {
  isReady: boolean;
  isWaking: boolean;
  statusMessage: string | null;
  onWake: () => void;
};

export function ServerWakeControl({
  isReady,
  isWaking,
  statusMessage,
  onWake,
}: ServerWakeControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onWake}
          disabled={isWaking || isReady}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:scale-105 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:shadow-[0_0_24px_rgba(97,195,255,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isReady ? "Server Ready" : isWaking ? "Starting Server..." : "Wake Server"}
        </button>

        {isReady ? (
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100">
            Server is ready
          </span>
        ) : null}
      </div>

      {statusMessage ? (
        <p
          className={`text-sm ${
            statusMessage.startsWith("Unable")
              ? "text-amber-100"
              : "text-slate-300"
          }`}
        >
          {statusMessage}
        </p>
      ) : null}
    </div>
  );
}
