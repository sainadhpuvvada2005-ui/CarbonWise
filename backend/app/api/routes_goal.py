from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.goal import Goal
from app.models.user import User
from app.schemas.goal import GoalCreate, GoalRead
from app.services.analytics import build_analytics

router = APIRouter(tags=["goals"])


@router.post("/goal", response_model=GoalRead, status_code=201)
def create_goal(payload: GoalCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if payload.end_date <= payload.start_date:
        raise HTTPException(status_code=422, detail="End date must be after start date")
    goal = Goal(user_id=user.id, **payload.model_dump())
    db.add(goal)
    db.commit()
    db.refresh(goal)
    progress = next((item for item in build_analytics(db, user)["goal_progress"] if item["id"] == goal.id), None)
    return {**payload.model_dump(), "id": goal.id, "completed": False, **(progress or {"progress_percent": 0, "current_kg": 0})}


@router.get("/goal", response_model=list[GoalRead])
def list_goals(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    goals = db.query(Goal).filter(Goal.user_id == user.id).all()
    progress = {item["id"]: item for item in build_analytics(db, user)["goal_progress"]}
    return [
        {
            "id": goal.id,
            "title": goal.title,
            "target_kg": goal.target_kg,
            "baseline_kg": goal.baseline_kg,
            "start_date": goal.start_date,
            "end_date": goal.end_date,
            "completed": progress.get(goal.id, {}).get("completed", goal.completed),
            "progress_percent": progress.get(goal.id, {}).get("progress_percent", 0),
            "current_kg": progress.get(goal.id, {}).get("current_kg", 0),
        }
        for goal in goals
    ]
