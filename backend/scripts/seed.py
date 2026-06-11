from datetime import date, timedelta

from app.core.security import hash_password
from app.db.session import Base, SessionLocal, engine
from app.models.activity import Activity
from app.models.goal import Goal
from app.models.user import User
from app.services.carbon import calculate_emission, level_for_points

Base.metadata.create_all(bind=engine)

db = SessionLocal()
try:
    user = db.query(User).filter(User.email == "demo@carbonwise.app").first()
    if not user:
        user = User(
            email="demo@carbonwise.app",
            full_name="Demo Climate Hero",
            hashed_password=hash_password("DemoPass123!"),
            green_points=420,
            green_streak=8,
        )
        user.sustainability_level = level_for_points(user.green_points)
        db.add(user)
        db.commit()
        db.refresh(user)

    if not user.activities:
        samples = [
            ("transportation", "car", 18, "km"),
            ("transportation", "train", 30, "km"),
            ("electricity", "electricity", 9, "kWh"),
            ("food", "vegetarian", 2, "meals"),
            ("food", "non-vegetarian", 1, "meals"),
            ("waste", "plastic", 0.4, "kg"),
            ("water", "water", 120, "liters"),
        ]
        for index in range(28):
            category, activity_type, quantity, unit = samples[index % len(samples)]
            db.add(
                Activity(
                    user_id=user.id,
                    category=category,
                    activity_type=activity_type,
                    quantity=quantity,
                    unit=unit,
                    emission_kg=calculate_emission(category, activity_type, quantity),
                    activity_date=date.today() - timedelta(days=index),
                    notes="Seeded demo activity",
                )
            )

    if not user.goals:
        db.add(
            Goal(
                user_id=user.id,
                title="Reduce June footprint by 20%",
                baseline_kg=320,
                target_kg=256,
                start_date=date.today().replace(day=1),
                end_date=date.today() + timedelta(days=30),
            )
        )
    db.commit()
    print("Seed data ready: demo@carbonwise.app / DemoPass123!")
finally:
    db.close()
