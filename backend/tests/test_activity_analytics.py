def test_activity_crud_and_analytics(client, auth_headers):
    payload = {
        "category": "transportation",
        "activity_type": "car",
        "quantity": 10,
        "unit": "km",
        "activity_date": "2026-06-11",
        "notes": "commute",
    }
    created = client.post("/activity", json=payload, headers=auth_headers)
    assert created.status_code == 201
    assert created.json()["emission_kg"] == 1.92

    activity_id = created.json()["id"]
    updated = client.put(f"/activity/{activity_id}", json={"quantity": 20}, headers=auth_headers)
    assert updated.status_code == 200
    assert updated.json()["emission_kg"] == 3.84

    analytics = client.get("/analytics", headers=auth_headers)
    assert analytics.status_code == 200
    assert analytics.json()["total_emissions"] == 3.84
    assert analytics.json()["sustainability_score"] > 0


def test_goals_and_recommendations(client, auth_headers):
    goal = client.post(
        "/goal",
        json={
            "title": "Monthly reduction",
            "baseline_kg": 100,
            "target_kg": 80,
            "start_date": "2026-06-01",
            "end_date": "2026-06-30",
        },
        headers=auth_headers,
    )
    assert goal.status_code == 201

    recommendations = client.get("/recommendations", headers=auth_headers)
    assert recommendations.status_code == 200
    assert len(recommendations.json()) == 3
