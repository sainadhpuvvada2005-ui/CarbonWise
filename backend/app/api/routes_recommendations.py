from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.recommendation import Recommendation
from app.models.user import User
from app.schemas.recommendation import RecommendationRead
from app.services.recommendations import generate_recommendations

router = APIRouter(tags=["recommendations"])


@router.get("/recommendations", response_model=list[RecommendationRead])
def recommendations(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    latest = (
        db.query(Recommendation)
        .filter(Recommendation.user_id == user.id)
        .order_by(Recommendation.created_at.desc())
        .limit(3)
        .all()
    )
    return latest or generate_recommendations(db, user)
