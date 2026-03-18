# PDF Intelligence System

PDF Intelligence System is a full-stack web application that lets users upload a PDF and receive:

- Concise document summaries
- Important topic extraction
- Question answering grounded in the uploaded document

## Project Structure

```text
pdf-intelligence-system
|
|-- backend
|   |-- main.py
|   |-- pdf_reader.py
|   |-- summarizer.py
|   |-- qa_engine.py
|   |-- requirements.txt
|   `-- .env.example
|
|-- frontend
|   |-- app
|   |   |-- globals.css
|   |   |-- layout.tsx
|   |   `-- page.tsx
|   |-- components
|   |   |-- AnswerPanel.tsx
|   |   |-- DashboardShell.tsx
|   |   |-- SummaryPanel.tsx
|   |   |-- TopicsPanel.tsx
|   |   `-- UploadPanel.tsx
|   |-- lib
|   |   `-- api.ts
|   |-- next-env.d.ts
|   |-- package.json
|   |-- postcss.config.js
|   |-- tailwind.config.ts
|   `-- tsconfig.json
```

## Backend Setup

1. Open a terminal in `D:\Portfolio\PDF Intelligence System\backend`
2. Create and activate a virtual environment
3. Install dependencies

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

4. Start the FastAPI server

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

For local development on Windows PowerShell, you can set the port first:

```powershell
$env:PORT=8001
uvicorn main:app --host 0.0.0.0 --port $env:PORT --reload
```

Backend will run at [http://127.0.0.1:8001](http://127.0.0.1:8001) when `PORT=8001`.

## Frontend Setup

1. Open a second terminal in `D:\Portfolio\PDF Intelligence System\frontend`
2. Install packages

```bash
npm install
```

3. Start the Next.js app

```bash
npm run dev
```

Frontend will run at [http://localhost:3000](http://localhost:3000).

## Environment Variables

The frontend uses `NEXT_PUBLIC_API_BASE_URL` to reach the backend.

Create `frontend/.env.local` if you want to override the default:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8001
```

## Local Multi-Service Port Map

- Smart Data Analyzer: `127.0.0.1:8000`
- PDF Intelligence System: `127.0.0.1:8001`
- Resume Analyzer: `127.0.0.1:8002`

The backend ships with local NLP logic out of the box. You can extend `summarizer.py` later for an external LLM provider if needed.

## API Endpoints

- `POST /upload` - Upload a PDF and extract text
- `POST /summary` - Generate a summary from a previously uploaded document
- `POST /topics` - Return document topics and keywords
- `POST /ask` - Answer a question using uploaded document content

## Notes

- Uploaded documents are stored in server memory for simplicity
- Invalid or scanned image-only PDFs return helpful errors
- The QA response includes evidence snippets so users can inspect why the answer was chosen
