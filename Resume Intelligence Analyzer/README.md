# Resume Intelligence Analyzer

A full-stack web application for uploading resumes and generating structured insights including extracted skills, estimated experience, a resume score, and a short candidate summary.

## Project Structure

```text
Resume Intelligence Analyzer/
|-- README.md
|-- backend/
|   |-- main.py
|   |-- requirements.txt
|   |-- resume_reader.py
|   |-- scoring.py
|   `-- skill_extractor.py
`-- frontend/
    |-- app/
    |   |-- globals.css
    |   |-- layout.tsx
    |   `-- page.tsx
    |-- components/
    |   |-- ScoreGauge.tsx
    |   |-- SkillsDisplay.tsx
    |   |-- SummaryPanel.tsx
    |   `-- UploadPanel.tsx
    |-- next-env.d.ts
    |-- next.config.mjs
    |-- package.json
    |-- postcss.config.js
    |-- tailwind.config.ts
    `-- tsconfig.json
```

## Backend Overview

- `POST /upload`
  - Accepts PDF or DOCX files.
  - Extracts text and returns the raw resume text.
- `POST /analyze`
  - Accepts extracted resume text.
  - Returns detected skills, experience estimation, score, and candidate summary.

## Features

- Resume upload for PDF and DOCX files
- Text extraction using `pdfplumber`, `pypdf`, and `python-docx`
- Skill detection for common technical skills
- Experience estimation from resume phrases
- Resume scoring from 0 to 100
- Candidate profile summary
- Special override rule for `"Nahush Hirolikar"`

## Run the Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --host 0.0.0.0 --port 8002 --reload
```

Backend runs on `http://127.0.0.1:8002`.

## Deploy on Render

- Root config: `render.yaml`
- Render start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- The backend entry point remains `backend/main.py`

## Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://127.0.0.1:3000`.

## Notes

- The backend includes a fallback to `spacy.blank("en")` if `en_core_web_sm` is not installed, but downloading the model gives better sentence handling.
- Local service ports: `127.0.0.1:8000` for Smart Data Analyzer, `127.0.0.1:8001` for PDF Intelligence, and `127.0.0.1:8002` for Resume Analyzer.
- Update `NEXT_PUBLIC_API_URL` in the frontend environment if the backend runs on a different host or port.
