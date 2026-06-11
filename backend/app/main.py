from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.api import routes_activity, routes_analytics, routes_auth, routes_goal, routes_leaderboard, routes_recommendations
from app.core.config import get_settings
from app.db.session import Base, engine
from app import models

settings = get_settings()

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="CarbonWise carbon footprint tracking and recommendation API.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.backend_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])

app.include_router(routes_auth.router)
app.include_router(routes_activity.router)
app.include_router(routes_analytics.router)
app.include_router(routes_goal.router)
app.include_router(routes_recommendations.router)
app.include_router(routes_leaderboard.router)


@app.get("/health", tags=["system"])
def health():
    return {"status": "ok", "service": settings.app_name}
