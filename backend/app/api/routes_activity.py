from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.activity import Activity
from app.models.achievement import Achievement
from app.models.user import User
from app.schemas.activity import ActivityCreate, ActivityRead, ActivityUpdate
from app.services.carbon import calculate_emission, level_for_points

router = APIRouter(tags=["activity"])


def _award_points(db: Session, user: User, emission_kg: float) -> None:
    points = max(5, int(50 - min(emission_kg, 45)))
    user.green_points += points
    user.green_streak += 1
    user.sustainability_level = level_for_points(user.green_points)
    if user.green_points >= 150 and not any(a.badge_name == "Green Sprout" for a in user.achievements):
        db.add(Achievement(user_id=user.id, badge_name="Green Sprout", description="Earned 150 green points"))


@router.post("/activity", response_model=ActivityRead, status_code=201)
def create_activity(payload: ActivityCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    try:
        emission = calculate_emission(payload.category, payload.activity_type, payload.quantity)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    activity = Activity(user_id=user.id, emission_kg=emission, **payload.model_dump())
    db.add(activity)
    _award_points(db, user, emission)
    db.commit()
    db.refresh(activity)
    return activity


@router.get("/activity", response_model=list[ActivityRead])
def list_activities(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return (
        db.query(Activity)
        .filter(Activity.user_id == user.id)
        .order_by(Activity.activity_date.desc(), Activity.created_at.desc())
        .all()
    )


@router.put("/activity/{activity_id}", response_model=ActivityRead)
def update_activity(
    activity_id: int,
    payload: ActivityUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    activity = db.query(Activity).filter(Activity.id == activity_id, Activity.user_id == user.id).first()
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    data = payload.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(activity, key, value)
    if {"category", "activity_type", "quantity"} & data.keys():
        activity.emission_kg = calculate_emission(activity.category, activity.activity_type, activity.quantity)
    db.commit()
    db.refresh(activity)
    return activity


@router.delete("/activity/{activity_id}", status_code=204)
def delete_activity(activity_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    activity = db.query(Activity).filter(Activity.id == activity_id, Activity.user_id == user.id).first()
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    db.delete(activity)
    db.commit()
    return None
