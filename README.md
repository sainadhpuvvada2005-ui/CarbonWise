# CarbonWise

AI-powered carbon footprint tracker for individuals who want to understand, track, and reduce their emissions through activity monitoring, analytics, gamification, and personalized recommendations.

## Stack

- Frontend: React, Vite, Tailwind CSS, Recharts
- Backend: FastAPI, SQLAlchemy, SQLite, JWT, bcrypt
- Analytics: pandas, numpy, scikit-learn
- Tests: pytest, React Testing Library, Vitest

## Quick Start

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
python -m pip install -r requirements.txt
copy .env.example .env
python scripts/seed.py
uvicorn app.main:app --reload
```

API docs are available at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Open `http://localhost:5173`.

## Demo Account

- Email: `demo@carbonwise.app`
- Password: `DemoPass123!`

## Project Structure

```text
backend/
  app/
    api/
    core/
    db/
    models/
    schemas/
    services/
  scripts/
  tests/
frontend/
  src/
    components/
    context/
    data/
    lib/
    pages/
    styles/
docs/
sample-data/
```

## Deployment

- Frontend: Vercel with `VITE_API_URL` set to the Render backend URL.
- Backend: Render Python service using `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for full details.
