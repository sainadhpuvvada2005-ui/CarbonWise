from datetime import date, datetime

from pydantic import BaseModel, Field


class ActivityBase(BaseModel):
    category: str = Field(pattern="^(transportation|electricity|food|waste|water)$")
    activity_type: str = Field(min_length=2, max_length=60)
    quantity: float = Field(gt=0, le=100000)
    unit: str = Field(min_length=1, max_length=30)
    activity_date: date
    notes: str | None = Field(default=None, max_length=500)


class ActivityCreate(ActivityBase):
    pass


class ActivityUpdate(BaseModel):
    category: str | None = Field(default=None, pattern="^(transportation|electricity|food|waste|water)$")
    activity_type: str | None = Field(default=None, min_length=2, max_length=60)
    quantity: float | None = Field(default=None, gt=0, le=100000)
    unit: str | None = Field(default=None, min_length=1, max_length=30)
    activity_date: date | None = None
    notes: str | None = Field(default=None, max_length=500)


class ActivityRead(ActivityBase):
    id: int
    emission_kg: float
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
