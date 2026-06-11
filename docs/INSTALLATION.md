# Installation Guide

## Prerequisites

- Python 3.11+
- Node.js 20+
- npm 10+

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
python -m pip install -r requirements.txt
copy .env.example .env
python scripts/seed.py
uvicorn app.main:app --reload
```

## Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

## Verification

```bash
cd backend
pytest
```

```bash
cd frontend
npm test
npm run build
```
