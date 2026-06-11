# CarbonWise Backend

FastAPI service with JWT authentication, carbon calculations, analytics, goals, achievements, and recommendation APIs.

## Run

```bash
python -m venv .venv
.venv\Scripts\activate
python -m pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

## Test

```bash
pytest
```

## API Summary

- `POST /register`
- `POST /login`
- `POST /logout`
- `POST /activity`
- `GET /activity`
- `PUT /activity/{id}`
- `DELETE /activity/{id}`
- `GET /analytics`
- `POST /goal`
- `GET /goal`
- `GET /recommendations`
- `GET /leaderboard`
- `GET /me`
