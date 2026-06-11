def test_register_and_login(client):
    created = client.post(
        "/register",
        json={"email": "ada@example.com", "full_name": "Ada Lovelace", "password": "Secret123!"},
    )
    assert created.status_code == 201
    assert created.json()["email"] == "ada@example.com"

    logged_in = client.post("/login", json={"email": "ada@example.com", "password": "Secret123!"})
    assert logged_in.status_code == 200
    assert logged_in.json()["token_type"] == "bearer"
    assert logged_in.json()["access_token"]


def test_login_rejects_bad_password(client):
    client.post("/register", json={"email": "bad@example.com", "full_name": "Bad Login", "password": "Secret123!"})
    response = client.post("/login", json={"email": "bad@example.com", "password": "wrong"})
    assert response.status_code == 401
