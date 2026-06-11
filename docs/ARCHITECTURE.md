# Architecture

CarbonWise uses a clean split between a FastAPI backend and a React frontend.

## Backend

- `api`: HTTP route handlers and auth dependencies.
- `models`: SQLAlchemy ORM tables.
- `schemas`: Pydantic request and response models.
- `services`: carbon calculation, analytics, forecasting, recommendations.
- `core`: settings and security helpers.
- `db`: database engine and session management.

SQLite is used by default through SQLAlchemy. To upgrade to MySQL, replace `DATABASE_URL` with a MySQL SQLAlchemy URL and install the chosen driver.

## Frontend

- `components`: reusable shell, cards, chart panels, empty states, theme toggle.
- `context`: authentication state.
- `lib`: API client.
- `pages`: route-level screens.
- `data`: calculator options.

Routes are protected client-side with JWT presence and `/me` validation. The backend remains the source of truth for authorization.

## Security

- JWT bearer authentication.
- Bcrypt password hashing.
- Pydantic input validation.
- SQLAlchemy parameterized queries.
- CORS allowlist through environment config.
- Minimal error detail for auth failures.
