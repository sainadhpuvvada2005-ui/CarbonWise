from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.analytics import AnalyticsResponse
from app.services.analytics import build_analytics

router = APIRouter(tags=["analytics"])


@router.get("/analytics", response_model=AnalyticsResponse)
def analytics(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return build_analytics(db, user)
