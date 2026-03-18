# Smart Data Analyzer

Smart Data Analyzer is a full-stack web app that lets users upload a CSV file, inspect a preview, and instantly receive automated analysis and chart-ready visualizations.

## Project Structure

```text
smart-data-analyzer/
├── backend/
│   ├── analysis.py
│   ├── main.py
│   ├── requirements.txt
│   └── visualization.py
└── frontend/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── DashboardShell.tsx
    │   ├── DatasetPreview.tsx
    │   ├── InsightsSummary.tsx
    │   ├── StatsPanel.tsx
    │   ├── UploadSection.tsx
    │   └── charts/
    │       ├── CategoryBarChart.tsx
    │       ├── CorrelationHeatmap.tsx
    │       ├── HistogramCard.tsx
    │       └── ScatterCard.tsx
    ├── lib/
    │   ├── api.ts
    │   └── types.ts
    ├── next.config.js
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.ts
    └── tsconfig.json
```

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on `http://localhost:8000`.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## Environment Notes

- The frontend expects the API at `http://localhost:8000`
- To change it, set `NEXT_PUBLIC_API_BASE_URL` before starting the frontend

## API Endpoints

- `POST /upload`
- `POST /analyze`
- `POST /visualize`
