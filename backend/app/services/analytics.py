from datetime import date, timedelta

import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sqlalchemy.orm import Session

from app.models.activity import Activity
from app.models.goal import Goal
from app.models.user import User


def _frame(activities: list[Activity]) -> pd.DataFrame:
    rows = [
        {
            "date": activity.activity_date,
            "category": activity.category,
            "emission_kg": activity.emission_kg,
        }
        for activity in activities
    ]
    if not rows:
        return pd.DataFrame(columns=["date", "category", "emission_kg"])
    df = pd.DataFrame(rows)
    df["date"] = pd.to_datetime(df["date"])
    return df


def sustainability_score(total_30_days: float) -> int:
    score = 100 - min(85, int(total_30_days / 6))
    return max(score, 15)


def forecast_next_month(df: pd.DataFrame) -> float:
    if df.empty:
        return 0.0
    monthly = df.set_index("date").resample("ME")["emission_kg"].sum().reset_index()
    if len(monthly) < 2:
        return round(float(monthly["emission_kg"].sum()), 2)
    x = np.arange(len(monthly)).reshape(-1, 1)
    y = monthly["emission_kg"].to_numpy()
    model = LinearRegression().fit(x, y)
    return round(max(float(model.predict([[len(monthly)]])[0]), 0.0), 2)


def build_analytics(db: Session, user: User) -> dict:
    activities = (
        db.query(Activity)
        .filter(Activity.user_id == user.id)
        .order_by(Activity.activity_date.asc())
        .all()
    )
    df = _frame(activities)
    today = date.today()
    total = round(float(df["emission_kg"].sum()), 2) if not df.empty else 0.0
    last_30 = df[df["date"] >= pd.Timestamp(today - timedelta(days=30))] if not df.empty else df
    total_30 = float(last_30["emission_kg"].sum()) if not last_30.empty else 0.0

    def grouped(freq: str) -> list[dict]:
        if df.empty:
            return []
        data = df.set_index("date").resample(freq)["emission_kg"].sum().tail(12)
        return [{"label": str(index.date()), "emissions": round(float(value), 2)} for index, value in data.items()]

    category_breakdown = []
    if not df.empty:
        category_breakdown = [
            {"category": category, "emissions": round(float(value), 2)}
            for category, value in df.groupby("category")["emission_kg"].sum().items()
        ]

    goals = db.query(Goal).filter(Goal.user_id == user.id).all()
    goal_progress = []
    for goal in goals:
        in_range = df[
            (df["date"] >= pd.Timestamp(goal.start_date))
            & (df["date"] <= pd.Timestamp(goal.end_date))
        ] if not df.empty else df
        current = round(float(in_range["emission_kg"].sum()), 2) if not in_range.empty else 0.0
        reduction = max(goal.baseline_kg - current, 0)
        needed = max(goal.baseline_kg - goal.target_kg, 1)
        progress = min(round((reduction / needed) * 100, 1), 100)
        goal_progress.append(
            {
                "id": goal.id,
                "title": goal.title,
                "target_kg": goal.target_kg,
                "current_kg": current,
                "progress_percent": progress,
                "completed": progress >= 100,
            }
        )

    challenges = [
        {"title": "Car-free commute", "points": 35, "category": "transportation"},
        {"title": "10% lower electricity day", "points": 25, "category": "electricity"},
        {"title": "Zero plastic lunch", "points": 20, "category": "waste"},
    ]

    return {
        "total_emissions": total,
        "daily_summary": grouped("D")[-7:],
        "weekly_trends": grouped("W"),
        "monthly_trends": grouped("ME"),
        "category_breakdown": category_breakdown,
        "sustainability_score": sustainability_score(total_30),
        "forecast_next_month": forecast_next_month(df),
        "green_points": user.green_points,
        "green_streak": user.green_streak,
        "level": user.sustainability_level,
        "goal_progress": goal_progress,
        "challenges": challenges,
    }
