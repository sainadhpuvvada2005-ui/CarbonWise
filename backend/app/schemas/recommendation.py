from datetime import datetime

from pydantic import BaseModel


class RecommendationRead(BaseModel):
    id: int | None = None
    category: str
    title: str
    message: str
    impact: str
    created_at: datetime | None = None

    model_config = {"from_attributes": True}
