export type Project = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  overview: string;
  problemStatement: string;
  architecture: string[];
  technologies: string[];
  demoHighlights: string[];
  codeUrl: string;
  impactData: {
    phase: string;
    score: number;
  }[];
};

export const dashboardTiles = [
  {
    href: "/resume",
    title: "Resume",
    description: "A quick overview of my professional background, including my education, certifications, and experience.",
    stat: "Explore Resume",
    accent: "#61c3ff",
  },
  {
    href: "/projects",
    title: "Projects",
    description: "Flagship analytics and AI products with architecture stories and code links.",
    stat: "4 featured builds",
    accent: "#1ef2b1",
  },
  {
    href: "/skills",
    title: "Skills",
    description: "An overview of the technical skills and tools I use to analyze data, build models, and explore intelligent solutions.",
    stat: "25+ practical skills",
    accent: "#ffb24d",
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Direct channels for collaboration, consulting, hiring, or technical discussions.",
    stat: "Open to remote and hybrid roles",
    accent: "#ff6b88",
  },
  {
    href: "https://github.com/Nahush1122",
    title: "GitHub",
    description: "Browse repositories, experiments, and technical write-ups from the engineering side.",
    stat: "Public code portfolio",
    accent: "#c58cff",
  },
  {
    href: "https://www.linkedin.com/in/nahush-hirolikar-14023538a/",
    title: "LinkedIn",
    description: "Professional profile, work history, and recommendations for client or employer review.",
    stat: "Career snapshot",
    accent: "#79a8ff",
  },
  {
    href: "/ai-tools-lab",
    title: "AI Tools Lab",
    description: "A mini command center for automation, LLM workflows, and productivity experiments.",
    stat: "LLM-assisted workflow studio",
    accent: "#68f5d6",
  },
  {
    href: "/server-status",
    title: "Server Status",
    description: "Operational telemetry with mocked uptime, CPU, and memory cards plus live-style charts.",
    stat: "Mocked realtime health board",
    accent: "#ffcf6a",
  },
];

export const resumeData = {
  summary:
    "Computer Engineering graduate with a strong interest in data and artificial intelligence. Experienced in working with Python, SQL, and data analysis techniques to extract insights and build intelligent solutions. Passionate about exploring AI-driven approaches, developing practical projects, and continuously learning new technologies to solve real-world problems.",
  education: [
    {
      degree: "Bachelor of Engineering in Computer Engineering",
      institution: "Savitribai Phule Pune University",
      year: "2024",
    },
    {
      degree: "Diploma in information technology ",
      institution: "SJSPM'S Jayawantrao Sawant Polytechnic ",
      year: "2021",
    },
  ],
  certifications: [
    "Google Data Analytics Certificatio",
    
  ],
  experience: [
    {
      role: "HR Digitization Intern ",
      company: "Bajaj Auto Ltd",
      period: "2024-205",
      highlights: [
        "Collaborated with HR and IT teams to design and manage interactive Power BI dashboards, delivering real-time insights into critical HR performance metrics.",
        "Worked on multiple AI and Machine Learning projects, including developing an Attrition Prediction Model using Python, with key libraries such as NumPy, Pandas, TensorFlow, Matplotlib, Scikit-learn, Xgboost, SVM, and Random Forest to predict employee turnover and support strategic workforce planning.",
        "Performed advanced data analysis to extract actionable insights, enabling data-driven decision-making for HR strategies.",
        "Designed comprehensive reports and visualizations to communicate analytical results effectively to HR leadership. ",
        "Contributed to digital transformation efforts by developing innovative solutions that improved HR process efficiency and automation",
      
      ],
    },
    
  ],
};

export const projects: Project[] = [
  {
    slug: "employee-attrition-intelligence-system",
    title: "Employee Attrition Intelligence System",
    category: "Predictive Analytics",
    shortDescription:
      "An HR analytics platform that predicts churn risk, explains drivers, and supports retention planning.",
    overview:
      "This solution combines data ingestion, feature engineering, model training, and a business-facing dashboard to help HR teams understand which employees are most at risk of attrition and why.",
    problemStatement:
      "Organizations often react to attrition too late because warning signals live across fragmented HR datasets and static reporting tools.",
    architecture: [
      "Ingest employee records, engagement scores, attendance, and compensation history through scheduled ETL jobs.",
      "Transform raw fields into workforce health indicators and feed them into classification pipelines.",
      "Expose risk scores, trend slices, and explainability outputs through a dashboard for HR leadership.",
    ],
    technologies: ["Python", "Scikit-learn", "Pandas", "Power BI", "SQL", "FastAPI"],
    demoHighlights: [
      "Risk segmentation by department and tenure band",
      "Feature importance and SHAP-inspired explanation views",
      "Retention planning tracker for high-risk cohorts",
    ],
    codeUrl: "https://github.com/yourusername/employee-attrition-intelligence-system",
    impactData: [
      { phase: "Discovery", score: 26 },
      { phase: "ETL", score: 48 },
      { phase: "Modeling", score: 72 },
      { phase: "Explainability", score: 84 },
      { phase: "Deployment", score: 92 },
    ],
  },
  {
    slug: "smart-data-analyzer",
    title: "Smart Data Analyzer",
    category: "Analytics Automation",
    shortDescription:
      "A self-service analytics assistant that profiles datasets, surfaces trends, and generates quick business summaries.",
    overview:
      "Smart Data Analyzer helps teams upload structured datasets and immediately get descriptive stats, anomaly signals, charts, and short AI-generated summaries for faster insight generation.",
    problemStatement:
      "Analysts spend too much time on repetitive data profiling before they can communicate meaningful findings.",
    architecture: [
      "Upload CSV or Excel data to a preprocessing service with schema validation.",
      "Generate exploratory statistics, trend summaries, and visualization suggestions automatically.",
      "Present outputs in a browser dashboard with exportable summaries and reusable templates.",
    ],
    technologies: ["Next.js", "Python", "Pandas", "OpenAI API", "Tailwind CSS", "Plotly"],
    demoHighlights: [
      "Automated schema profiling and null-pattern detection",
      "One-click summary generation for stakeholder sharing",
      "Time-series and segment comparison visual outputs",
    ],
    codeUrl: "https://github.com/yourusername/smart-data-analyzer",
    impactData: [
      { phase: "Upload", score: 30 },
      { phase: "Profiling", score: 58 },
      { phase: "Insighting", score: 78 },
      { phase: "Narrative", score: 88 },
      { phase: "Export", score: 94 },
    ],
  },
  {
    slug: "pdf-intelligence",
    title: "PDF Intelligence System",
    category: "Document Intelligence",
    shortDescription:
      "A document-intelligence application for uploading PDFs, extracting knowledge, and generating summaries, topics, and grounded answers.",
    overview:
      "The platform turns dense PDF files into searchable chunks, semantic summaries, and task-ready outputs for research, compliance, and internal operations teams.",
    problemStatement:
      "Important knowledge is trapped inside unstructured documents, making retrieval slow and inconsistent.",
    architecture: [
      "Parse PDFs into structured text blocks and metadata with fallback OCR support.",
      "Create embeddings and searchable indexes for semantic retrieval and document QA.",
      "Render summary views, extracted entities, and highlighted source passages inside the UI.",
    ],
    technologies: ["Python", "LangChain", "FAISS", "OCR", "FastAPI", "React"],
    demoHighlights: [
      "Semantic question answering over document collections",
      "Entity extraction for compliance and auditing workflows",
      "Executive summaries with source-aware evidence blocks",
    ],
    codeUrl: "https://github.com/yourusername/ai-pdf-intelligence-system",
    impactData: [
      { phase: "Parsing", score: 34 },
      { phase: "Chunking", score: 55 },
      { phase: "Embedding", score: 76 },
      { phase: "Retrieval", score: 87 },
      { phase: "Answering", score: 95 },
    ],
  },
  {
    slug: "resume-analyzer",
    title: "Resume Intelligence Analyzer",
    category: "HR Tech",
    shortDescription:
      "A resume analysis application that extracts skills, estimates experience, scores resumes, and generates candidate summaries.",
    overview:
      "Resume Analyzer processes candidate resumes, detects core skills, experience bands, and project relevance, then scores fit against job descriptions to help recruiters shortlist faster.",
    problemStatement:
      "Recruiters often review resumes manually, which slows hiring and introduces inconsistency in screening.",
    architecture: [
      "Ingest resumes and job descriptions through a parsing workflow with normalization steps.",
      "Extract skill entities, achievements, and experience signals using NLP heuristics and embeddings.",
      "Display fit scores, missing skill gaps, and profile summaries inside a recruiter-facing dashboard.",
    ],
    technologies: ["Python", "spaCy", "NLP", "React", "Node.js", "MongoDB"],
    demoHighlights: [
      "JD-to-resume matching scores with explainable reasons",
      "Candidate skill heatmaps and gap analysis",
      "Exportable shortlist summaries for recruiting teams",
    ],
    codeUrl: "https://github.com/yourusername/resume-analyzer",
    impactData: [
      { phase: "Parsing", score: 29 },
      { phase: "Extraction", score: 61 },
      { phase: "Matching", score: 81 },
      { phase: "Scoring", score: 89 },
      { phase: "Review", score: 93 },
    ],
  },
  
];

export const skillGroups = [
  {
    title: "Programming",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "C", "C++", "R"],
  },
  {
    title: "Data Analysis",
    items: ["Pandas", "NumPy","Matplotlib", "Power BI", "Excel", "Data Cleaning", "Data Visualization","Data Wrangling","Statistical analysis"],
  },
  {
    title: "Machine Learning",
    items: ["Scikit-learn", "XGBoost", "Model Evaluation", "Feature Engineering", "NLP", "MLOps Basics","TensorFlow","SVM","Random Forest"],
  },
  {
    title: "Web Development",
    items: ["Next.js", "React", "Tailwind CSS", "REST APIs", "FastAPI", "Node.js"],
  },
  {
    title: "Tools",
    items: ["Git", "Docker", "Jupyter", "Postman", "VS Code", "Linux"],
  },
  {
    title: "Cyber Securitys",
    items: [" Network Security", "Security Protocols", "Vulnerability Assessment", "Threat Analysis"],
  },
];

export const skillRadarData = [
  { area: "Data Analysis", score: 92 },
  { area: "Machine Learning", score: 88 },
  { area: "Visualization", score: 75 },
  { area: "Web Apps", score: 81 },
  { area: "Automation", score: 87 },
  { area: "Cloud", score: 74 },
];

export const aiTools = [
  {
    name: "Insight Copilot",
    summary: "Generates stakeholder-ready narratives from metrics and KPI deltas.",
  },
  {
    name: "Dataset QA Agent",
    summary: "Runs validation checks, highlights anomalies, and suggests next investigation steps.",
  },
  {
    name: "Prompt Workflow Builder",
    summary: "Creates reusable prompt chains for document analysis and internal productivity tasks.",
  },
  {
    name: "Model Monitor",
    summary: "Tracks inference drift and sends alerts when data or quality metrics move unexpectedly.",
  },
];

export const serverStatus = {
  status: "Operational",
  uptime: "99.98%",
  cpuUsage: "42%",
  memoryUsage: "68%",
  chartData: [
    { metric: "CPU", value: 42 },
    { metric: "Memory", value: 68 },
    { metric: "Disk", value: 57 },
    { metric: "Network", value: 34 },
  ],
};
