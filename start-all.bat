@echo off

echo Starting Portfolio Website...
cd /d D:\Portfolio\portfolio-website
start cmd /k "npm run dev"

echo Starting Smart Data Analyzer...
cd /d D:\Portfolio\smart-data-analyzer\backend
start cmd /k "uvicorn main:app --host 0.0.0.0 --port 8000"

echo Starting PDF Intelligence...
cd /d D:\Portfolio\PDF Intelligence System\backend
start cmd /k "uvicorn main:app --host 0.0.0.0 --port 8001"

echo Starting Resume Analyzer...
cd /d D:\Portfolio\Resume Intelligence Analyzer\backend
start cmd /k "uvicorn main:app --host 0.0.0.0 --port 8002"

echo All services started!
pause