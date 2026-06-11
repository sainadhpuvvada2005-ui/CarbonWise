TRANSPORT_FACTORS = {
    "car": 0.192,
    "bike": 0.0,
    "bus": 0.089,
    "train": 0.041,
    "flight": 0.255,
}

FOOD_FACTORS = {
    "vegan": 2.0,
    "vegetarian": 2.8,
    "non-vegetarian": 5.5,
}

WASTE_FACTORS = {
    "plastic": 6.0,
    "paper": 1.1,
    "food waste": 2.5,
}

ELECTRICITY_KG_PER_KWH = 0.82
WATER_KG_PER_LITER = 0.0003


def calculate_emission(category: str, activity_type: str, quantity: float) -> float:
    key = activity_type.strip().lower()
    if category == "transportation":
        factor = TRANSPORT_FACTORS.get(key)
    elif category == "electricity":
        factor = ELECTRICITY_KG_PER_KWH
    elif category == "food":
        factor = FOOD_FACTORS.get(key)
    elif category == "waste":
        factor = WASTE_FACTORS.get(key)
    elif category == "water":
        factor = WATER_KG_PER_LITER
    else:
        factor = None
    if factor is None:
        raise ValueError(f"Unsupported activity type '{activity_type}' for {category}")
    return round(quantity * factor, 3)


def level_for_points(points: int) -> str:
    if points >= 2000:
        return "Planet Guardian"
    if points >= 1000:
        return "Climate Champion"
    if points >= 500:
        return "Eco Builder"
    if points >= 150:
        return "Green Sprout"
    return "Seedling"
