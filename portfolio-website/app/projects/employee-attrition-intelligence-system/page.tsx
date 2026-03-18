import { DashboardShell } from "@/components/dashboard-shell";
import { MetricCard } from "@/components/metric-card";
import { ProjectAssetCard } from "@/components/project-asset-card";
import { AttritionModelComparisonChart } from "@/components/charts/attrition-model-comparison-chart";
import {
  attritionAssetCards,
  attritionDatasetStats,
  attritionInsights,
  attritionPipelineSteps,
  m1ModelComparison,
  rcImpactMetrics,
} from "@/lib/employee-attrition-case-study";

export default function EmployeeAttritionIntelligenceSystemPage() {
  return (
    <DashboardShell
      eyebrow="ML Case Study"
      title="Employee Attrition Intelligence System"
      description="A machine learning case study built during an internship at Bajaj Auto Limited to predict employee attrition risk and uncover the signals most associated with employee exits."
    >
      {/* Project header */}
      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Project Header
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">
            Employee Attrition Intelligence System
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Developed during an internship at Bajaj Auto Limited, this project
            turned workforce and exit-interview records into a structured ML case
            study that estimates attrition risk, surfaces likely exit reasons, and
            highlights the employee features with the strongest predictive power.
          </p>
        </div>

        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Problem Definition
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Goal</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Predict employee attrition risk and identify the key factors that
                influence employee exits across Bajaj Auto workforce data.
              </p>
            </div>
            <div className="rounded-[22px] border border-cyan-300/15 bg-cyan-300/10 p-4">
              <p className="text-sm font-semibold text-cyan-100">
                M1: Binary Classification
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-200">
                Predicts the probability of employee attrition as an
                active-versus-inactive outcome.
              </p>
            </div>
            <div className="rounded-[22px] border border-emerald-300/15 bg-emerald-300/10 p-4">
              <p className="text-sm font-semibold text-emerald-100">
                M2: Multi-class Classification
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-200">
                Predicts likely exit reasons such as better opportunities, higher
                education, and personal reasons.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      {/* Pipeline visualization */}
      <section className="glass-panel rounded-[28px] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Machine Learning Pipeline
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Workflow used across the case study
            </h3>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-400">
            The presentation describes a supervised-learning pipeline spanning
            historical attrition records, engineered employee features, model
            training, evaluation, and feature filtering.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {attritionPipelineSteps.map((step, index) => (
            <div
              key={step}
              className="rounded-[24px] border border-white/10 bg-white/5 p-4"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                Step 0{index + 1}
              </p>
              <p className="mt-2 text-lg font-semibold text-white">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Model comparison and supporting insights */}
      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <AttritionModelComparisonChart data={m1ModelComparison} />

        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Best Performing Model
          </p>
          <div className="mt-4 rounded-[24px] border border-emerald-300/20 bg-emerald-300/10 p-5">
            <p className="text-3xl font-semibold text-emerald-100">XGBoost</p>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              XGBoost achieved the strongest M1 performance in the presentation,
              delivering 77% accuracy and 77% F1 score while also reaching 90%
              recall, making it the most reliable option for catching attrition
              cases.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {attritionInsights.slice(0, 3).map((insight) => (
              <div
                key={insight}
                className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7 text-slate-200"
              >
                {insight}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual assets from the presentation */}
      <section className="grid gap-4 lg:grid-cols-2">
        <ProjectAssetCard
          title="Feature Importance"
          description="Extracted from the presentation media folder. RC and tenure-related fields dominated the most influential drivers for attrition scoring."
          src="/project-assets/employee-attrition-intelligence-system/image20.png"
        />
        <ProjectAssetCard
          title="Confusion Matrix"
          description="Presentation evaluation visual showing the active-vs-inactive prediction split for one of the strongest business-unit models."
          src="/project-assets/employee-attrition-intelligence-system/image16.png"
        />
      </section>

      {/* Business insights */}
      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Business Insights
          </p>
          <div className="mt-5 space-y-3">
            {attritionInsights.map((insight) => (
              <div
                key={insight}
                className="rounded-[20px] border border-cyan-300/12 bg-cyan-300/10 px-4 py-3 text-sm leading-7 text-slate-100"
              >
                {insight}
              </div>
            ))}
          </div>
        </div>

        
      </section>

      {/* Asset gallery and folder note */}
      <section className="glass-panel rounded-[28px] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Visual Assets
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Project image folder
            </h3>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-400">
            Add or replace case-study visuals in
            `public/project-assets/employee-attrition-intelligence-system/` and
            reference them in this page to expand the report dashboard over time.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {attritionAssetCards.map((asset) => (
            <ProjectAssetCard
              key={asset.title}
              title={asset.title}
              description={asset.description}
              src={asset.src}
            />
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
