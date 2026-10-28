# Omniscribe

Omniscribe is a modular editorial production workspace for turning source material into fact-checked stories, scripts, audio, and video.

## Layout

- `backend/`: FastAPI API, workers, and domain services
- `frontend/nextjs-app/`: Next.js editorial dashboard
- `infra/`: Docker Compose and Kubernetes deployment starter
- `scripts/`: local development helpers
- `ci/`: GitHub Actions workflow

## Local development

Backend:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
python -m uvicorn app.main:app --app-dir backend --reload
```

Frontend:

```powershell
cd frontend\nextjs-app
npm install
npm run dev
```

Open `http://localhost:3000` for the dashboard or `http://localhost:8000/docs` for the API explorer. The current service implementations are deliberately provider-neutral starter adapters; connect production storage, language models, and media tooling behind those interfaces.
