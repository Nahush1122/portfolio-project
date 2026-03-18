export type DatasetPreview = {
  columns: string[];
  rows: Record<string, string | number | null>[];
  shape: {
    rows: number;
    columns: number;
  };
};

export type UploadResponse = {
  dataset_id: string;
  filename: string;
  preview: DatasetPreview;
  columns: string[];
};

export type SummaryStatistic = {
  column: string;
  count: number;
  mean: number;
  std: number;
  min: number;
  "25%": number;
  "50%": number;
  "75%": number;
  max: number;
};

export type MissingValue = {
  column: string;
  missing: number;
  missing_percentage: number;
};

export type CorrelationPoint = {
  x: string;
  y: string;
  value: number;
};

export type AnalysisResponse = {
  dataset_id: string;
  summary: {
    shape: {
      rows: number;
      columns: number;
    };
    summary_statistics: SummaryStatistic[];
    missing_values: MissingValue[];
    correlation_matrix: CorrelationPoint[];
  };
  columns: {
    names: string[];
    types: Record<string, string>;
  };
  insights: string[];
  charts: VisualizationResponse;
};

export type DashboardAnalysis = {
  shape: {
    rows: number;
    columns: number;
  };
  column_types: Record<string, string>;
  summary_statistics: SummaryStatistic[];
  missing_values: MissingValue[];
  correlation_matrix: CorrelationPoint[];
  insights: string[];
};

export type ChartSeries = {
  label: string;
  count: number;
};

export type HistogramChart = {
  column: string;
  data: ChartSeries[];
};

export type CategoryBarChart = {
  column: string;
  data: ChartSeries[];
};

export type ScatterPoint = {
  x: number;
  y: number;
};

export type ScatterRelationship = {
  x_axis: string;
  y_axis: string;
  data: ScatterPoint[];
} | null;

export type VisualizationResponse = {
  correlation_heatmap: CorrelationPoint[];
  histograms: HistogramChart[];
  categorical_bars: CategoryBarChart[];
  scatter_relationship: ScatterRelationship;
};
