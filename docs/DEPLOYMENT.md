# Deployment Guide

## Backend on Render

### Blueprint deployment

1. Push this repository to GitHub.
2. In Render, choose **New** then **Blueprint**.
3. Select the repository.
4. Render will read `render.yaml`.
5. Set `BACKEND_CORS_ORIGINS` after the Vercel deployment is created:

```json
["https://your-vercel-app.vercel.app"]
```

### Manual deployment

1. Create a new Web Service.
2. Set root directory to `backend`.
3. Use Python `3.12`.
4. Build command:

```bash
pip install -r requirements.txt
```

4. Start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

5. Add environment variables:

```text
SECRET_KEY=<long random value>
DATABASE_URL=sqlite:///./carbonwise.db
BACKEND_CORS_ORIGINS=["https://your-vercel-app.vercel.app"]
ENVIRONMENT=production
```

For MySQL, set `DATABASE_URL` to a SQLAlchemy MySQL URL and install an appropriate driver such as `pymysql`.

## Frontend on Vercel

1. Import the repo in Vercel.
2. Set root directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add:

```text
VITE_API_URL=https://your-render-service.onrender.com
```

The `frontend/vercel.json` file includes SPA rewrites so direct visits to `/dashboard`, `/login`, and other React routes work after deployment.

## Security Checklist

- Use a strong `SECRET_KEY`.
- Restrict CORS to deployed frontend domains.
- Serve only over HTTPS in production.
- Store JWT in local storage only for this hackathon build; prefer httpOnly cookies for higher-security deployments.
- Use database backups before migrating from SQLite to MySQL.
