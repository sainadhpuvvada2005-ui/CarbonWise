from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User

router = APIRouter(tags=["leaderboard"])


@router.get("/leaderboard")
def leaderboard(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    users = db.query(User).order_by(User.green_points.desc()).limit(10).all()
    return [
        {
            "rank": index + 1,
            "full_name": user.full_name,
            "green_points": user.green_points,
            "level": user.sustainability_level,
            "green_streak": user.green_streak,
        }
        for index, user in enumerate(users)
    ]
