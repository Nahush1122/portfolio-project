export const attritionDatasetStats = [
  {
    label: "Inactive Employees",
    value: "1,440",
    hint: "Till 2023 historical attrition records",
  },
  {
    label: "Active Employees",
    value: "2,206",
    hint: "Till July 2024 active workforce records",
  },
  {
    label: "Testing Dataset",
    value: "261",
    hint: "Inactive employee muster from 2024",
  },
];

export const attritionPipelineSteps = [
  "Data Loading",
  "Data Preprocessing",
  "Label Encoding",
  "Feature Scaling",
  "Model Training",
  "Model Evaluation",
  "Feature Selection",
];

export const m1ModelComparison = [
  { model: "Logistic Regression", accuracy: 28, f1: 4 },
  { model: "Naive Bayes", accuracy: 40, f1: 51 },
  { model: "Support Vector Machine", accuracy: 33, f1: 37 },
  { model: "Neural Network", accuracy: 68, f1: 56 },
  { model: "XGBoost", accuracy: 77, f1: 77 },
];

export const rcImpactMetrics = [
  {
    metric: "Accuracy",
    original: "85.4%",
    noRc: "44.1%",
    rc4Excluded: "74.6%",
  },
  {
    metric: "Precision",
    original: "76.7%",
    noRc: "35.0%",
    rc4Excluded: "70.2%",
  },
  {
    metric: "Recall",
    original: "83.6%",
    noRc: "41.8%",
    rc4Excluded: "84.2%",
  },
  {
    metric: "F1 Score",
    original: "80.0%",
    noRc: "38.1%",
    rc4Excluded: "76.8%",
  },
];

export const attritionInsights = [
  "M1 framed attrition as a binary classification problem, estimating the probability that an employee would become inactive.",
  "M2 extended the case study into multi-class classification to estimate likely exit reasons such as better opportunities, higher education, or personal reasons.",
  "XGBoost delivered the strongest M1 performance with 77% accuracy, 68% precision, 90% recall, and a 77% F1 score.",
  "Employee Rating data was a major signal: overall accuracy dropped from 85.4% to 44.1% when Rating data was removed, showing that performance ratings heavily influenced predictive quality.",
  "Excluding only Rating = Low reduced the damage compared with removing all Rating features, suggesting selective Rating treatment preserved more business signal.",
];

export const attritionAssetCards = [
  {
    title: "Confusion Matrix",
    description: "Evaluation image extracted from the presentation for the strongest L3 R&D binary-classification split.",
    src: "/project-assets/employee-attrition-intelligence-system/image161.png",
  },
  {
    title: "Data Split",
    description: "The data has been split into two categories: active employee records and inactive (former) employee records.",
    src: "/project-assets/employee-attrition-intelligence-system/image301.png",
  },
  {
    title: "Dataset Split Output",
    description: "Prediction output artifact showing the probability-oriented output of M1 for unseen employee records.",
    src: "/project-assets/employee-attrition-intelligence-system/image81.png",
  },
  {
    title: "Reason Classification Output",
    description: "M2 output artifact showing ranked exit-reason probabilities for each employee record.",
    src: "/project-assets/employee-attrition-intelligence-system/image91.png",
  },
];
