"use client";

import { useEffect, useState } from "react";

type BackendLoadingCardProps = {
  title: string;
  steps?: string[];
  timeoutMessage?: string | null;
  loopSteps?: boolean;
  showReassurance?: boolean;
};

const defaultLoadingSteps = [
  "Waking up server...",
  "Connecting...",
  "Processing...",
];

export function BackendLoadingCard({
  title,
  steps = defaultLoadingSteps,
  timeoutMessage = null,
  loopSteps = false,
  showReassurance = false,
}: BackendLoadingCardProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    setActiveStep(0);
    setElapsedSeconds(0);

    const intervalId = window.setInterval(() => {
      setActiveStep((current) => {
        if (loopSteps) {
          return (current + 1) % steps.length;
        }

        return current < steps.length - 1 ? current + 1 : current;
      });
    }, 2400);

    const elapsedId = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
      window.clearInterval(elapsedId);
    };
  }, [loopSteps, steps]);

  const progressWidth = `${((activeStep + 1) / steps.length) * 100}%`;

  return (
    <div className="glass-panel rounded-[28px] p-8">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 h-5 w-5 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white">{title}</p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-200 transition-all duration-700 ease-in-out"
                style={{ width: progressWidth }}
              />
            </div>
          </div>

          <div className="space-y-2">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isComplete = loopSteps ? false : index < activeStep;

              return (
                <div
                  key={step}
                  className={`rounded-[18px] border px-4 py-3 text-sm transition-all duration-500 ${
                    isActive
                      ? "border-cyan-300/30 bg-cyan-300/12 text-cyan-100"
                      : isComplete
                        ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
                        : "border-white/10 bg-white/5 text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>{step}</span>
                    {isActive ? (
                      <span className="text-xs text-cyan-100/80">...</span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {showReassurance && elapsedSeconds >= 28 ? (
            <p className="text-sm text-slate-300">
              This may take a bit longer on first request (free hosting).
            </p>
          ) : null}

          {timeoutMessage ? (
            <p className="text-sm text-amber-100">{timeoutMessage}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
