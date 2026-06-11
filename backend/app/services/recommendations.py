from collections import defaultdict

from sqlalchemy.orm import Session

from app.models.activity import Activity
from app.models.recommendation import Recommendation
from app.models.user import User


def generate_recommendations(db: Session, user: User) -> list[Recommendation]:
    activities = db.query(Activity).filter(Activity.user_id == user.id).all()
    totals: dict[str, float] = defaultdict(float)
    for activity in activities:
        totals[activity.category] += activity.emission_kg

    templates = {
        "transportation": (
            "Optimize your commute",
            "Your transportation footprint is leading this period. Try replacing two short car trips with bus, train, biking, or pooled rides.",
            "High",
        ),
        "electricity": (
            "Trim peak electricity use",
            "Shift laundry and charging to off-peak hours, use LED lighting, and unplug idle appliances to lower electricity emissions.",
            "Medium",
        ),
        "food": (
            "Plan lower-carbon meals",
            "Add one plant-forward day this week and batch-plan meals to reduce high-emission food choices and food waste.",
            "Medium",
        ),
        "waste": (
            "Reduce disposable waste",
            "Carry reusable containers and sort paper, plastic, and organic waste to cut landfill-related emissions.",
            "Medium",
        ),
        "water": (
            "Lower daily water demand",
            "Use shorter showers, fix leaks quickly, and reuse greywater for plants where practical.",
            "Low",
        ),
    }

    ranked = sorted(totals.items(), key=lambda item: item[1], reverse=True)
    selected = [category for category, _ in ranked[:3]] or ["transportation", "electricity", "waste"]
    output: list[Recommendation] = []
    for category in selected:
        title, message, impact = templates[category]
        rec = Recommendation(user_id=user.id, category=category, title=title, message=message, impact=impact)
        db.add(rec)
        output.append(rec)
    db.commit()
    for rec in output:
        db.refresh(rec)
    return output
