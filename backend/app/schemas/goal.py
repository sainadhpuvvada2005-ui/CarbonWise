from datetime import date

from pydantic import BaseModel, Field


class GoalCreate(BaseModel):
    title: str = Field(min_length=3, max_length=120)
    target_kg: float = Field(gt=0)
    baseline_kg: float = Field(gt=0)
    start_date: date
    end_date: date


class GoalRead(GoalCreate):
    id: int
    completed: bool
    progress_percent: float
    current_kg: float

    model_config = {"from_attributes": True}
