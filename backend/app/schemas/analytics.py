from pydantic import BaseModel


class AnalyticsResponse(BaseModel):
    total_emissions: float
    daily_summary: list[dict]
    weekly_trends: list[dict]
    monthly_trends: list[dict]
    category_breakdown: list[dict]
    sustainability_score: int
    forecast_next_month: float
    green_points: int
    green_streak: int
    level: str
    goal_progress: list[dict]
    challenges: list[dict]
