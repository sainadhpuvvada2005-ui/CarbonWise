# CarbonWise API Documentation

Base URL in development: `http://localhost:8000`

Authentication uses JWT bearer tokens:

```http
Authorization: Bearer <token>
```

## Auth

### `POST /register`

Creates a user.

```json
{
  "email": "demo@carbonwise.app",
  "full_name": "Demo User",
  "password": "DemoPass123!"
}
```

### `POST /login`

Returns `{ "access_token": "...", "token_type": "bearer" }`.

### `POST /logout`

Client-side logout helper. Remove the stored token in the frontend.

### `POST /password-reset/request`

Generates a short-lived reset token. In development the token is returned as `dev_reset_token`; production deployments should send it by email instead.

### `POST /password-reset/confirm`

```json
{
  "token": "reset-token",
  "new_password": "NewPassword123!"
}
```

## Activity

### `POST /activity`

```json
{
  "category": "transportation",
  "activity_type": "car",
  "quantity": 12,
  "unit": "km",
  "activity_date": "2026-06-11",
  "notes": "Office commute"
}
```

Supported categories:

- `transportation`: `car`, `bike`, `bus`, `train`, `flight`
- `electricity`: `electricity`
- `food`: `vegetarian`, `non-vegetarian`, `vegan`
- `waste`: `plastic`, `paper`, `food waste`
- `water`: `water`

### `GET /activity`

Returns the authenticated user's activities.

### `PUT /activity/{id}`

Updates an activity and recalculates emissions when category, type, or quantity changes.

### `DELETE /activity/{id}`

Deletes an activity.

## Analytics

### `GET /analytics`

Returns total emissions, daily/weekly/monthly trends, category breakdown, sustainability score, goal progress, challenges, points, streak, level, and forecast.

## Goals

### `POST /goal`

Creates a monthly reduction target.

### `GET /goal`

Lists goals with live progress.

## Recommendations

### `GET /recommendations`

Returns personalized recommendations generated from the user's highest-emission categories.
