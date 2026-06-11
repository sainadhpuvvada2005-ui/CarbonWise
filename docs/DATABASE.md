# Database Schema

## users

- `id`
- `email`
- `full_name`
- `hashed_password`
- `green_points`
- `sustainability_level`
- `green_streak`
- `is_active`
- `created_at`

## activities

- `id`
- `user_id`
- `category`
- `activity_type`
- `quantity`
- `unit`
- `emission_kg`
- `activity_date`
- `notes`
- `created_at`
- `updated_at`

## goals

- `id`
- `user_id`
- `title`
- `target_kg`
- `baseline_kg`
- `start_date`
- `end_date`
- `completed`
- `created_at`

## achievements

- `id`
- `user_id`
- `badge_name`
- `description`
- `icon`
- `earned_at`

## recommendations

- `id`
- `user_id`
- `category`
- `title`
- `message`
- `impact`
- `created_at`
