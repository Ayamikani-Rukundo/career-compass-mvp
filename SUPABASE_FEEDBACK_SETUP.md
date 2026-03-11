# Supabase Feedback Table Setup Guide

## Overview

This guide helps you set up the `feedback` table in your Supabase project to receive user feedback from the PathFinder feedback page.

---

## Step 1: Open Supabase SQL Editor

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `rkshstqcegtwjmmfailw`
3. In the left sidebar, click **SQL Editor**
4. Click **New query**

---

## Step 2: Create the Feedback Table

Copy and paste this SQL into the editor, then click **Run**:

```sql
-- Create the feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id          BIGSERIAL PRIMARY KEY,
  user_id     TEXT          NOT NULL,
  feature_used TEXT         NOT NULL DEFAULT 'general',
  overall_rating INTEGER    CHECK (overall_rating BETWEEN 1 AND 5),
  was_helpful BOOLEAN,
  would_recommend BOOLEAN,
  liked_most  TEXT,
  improve     TEXT,
  name        TEXT,
  email       TEXT,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
```

---

## Step 3: Set Up Row Level Security (RLS)

Run this SQL to allow users to insert their own feedback, and to secure the data:

```sql
-- Enable RLS on the feedback table
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone (even unauthenticated users) to INSERT feedback
CREATE POLICY "Allow public insert"
  ON feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Prevent unauthenticated users from reading all feedback
-- (only admins with service role can SELECT)
CREATE POLICY "Allow authenticated select"
  ON feedback
  FOR SELECT
  TO authenticated
  USING (true);
```

---

## Step 4: Verify the Table

Run this to confirm the table was created correctly:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'feedback'
ORDER BY ordinal_position;
```

You should see these columns:

| Column          | Type                     | Nullable |
| --------------- | ------------------------ | -------- |
| id              | bigint                   | NO       |
| user_id         | text                     | NO       |
| feature_used    | text                     | NO       |
| overall_rating  | integer                  | YES      |
| was_helpful     | boolean                  | YES      |
| would_recommend | boolean                  | YES      |
| liked_most      | text                     | YES      |
| improve         | text                     | YES      |
| name            | text                     | YES      |
| email           | text                     | YES      |
| created_at      | timestamp with time zone | NO       |

---

## Column Reference

| Column            | Type        | Required | Description                                                            |
| ----------------- | ----------- | -------- | ---------------------------------------------------------------------- |
| `id`              | BIGINT      | Auto     | Primary key (auto-incremented)                                         |
| `user_id`         | TEXT        | YES      | UUID from localStorage (identifies the user)                           |
| `feature_used`    | TEXT        | YES      | Which page sent the feedback: `"assessment"`, `"chat"`, or `"general"` |
| `overall_rating`  | INTEGER     | NO       | Star rating from 1 to 5                                                |
| `was_helpful`     | BOOLEAN     | NO       | Did the user find PathFinder helpful?                                  |
| `would_recommend` | BOOLEAN     | NO       | Would they recommend PathFinder to others?                             |
| `liked_most`      | TEXT        | NO       | Open-ended: what they liked                                            |
| `improve`         | TEXT        | NO       | Open-ended: what should be improved                                    |
| `name`            | TEXT        | NO       | Optional user name for follow-up                                       |
| `email`           | TEXT        | NO       | Optional email for follow-up                                           |
| `created_at`      | TIMESTAMPTZ | Auto     | Timestamp of submission                                                |

---

## Reading Feedback as Admin

To view all feedback from the Supabase Dashboard:

1. Go to **Table Editor** in the left sidebar
2. Select the `feedback` table
3. You can filter, sort, and export from there

Or use SQL:

```sql
-- View all feedback, newest first
SELECT * FROM feedback ORDER BY created_at DESC;

-- Filter by feature
SELECT * FROM feedback WHERE feature_used = 'assessment';

-- Count by rating
SELECT overall_rating, COUNT(*) FROM feedback GROUP BY overall_rating ORDER BY overall_rating;

-- How many found it helpful?
SELECT was_helpful, COUNT(*) FROM feedback GROUP BY was_helpful;

-- Would recommend?
SELECT would_recommend, COUNT(*) FROM feedback GROUP BY would_recommend;

-- Users who left their email
SELECT name, email, liked_most, improve, created_at
FROM feedback
WHERE email IS NOT NULL
ORDER BY created_at DESC;
```

---

## Data Flow

```
User completes assessment or chat
         ↓
Success/Completion screen prompts feedback
         ↓
User fills out Feedback page (3 short steps)
         ↓
INSERT into Supabase feedback table:
{
  user_id: "uuid-from-localstorage",
  feature_used: "assessment" | "chat" | "general",
  overall_rating: 1-5,
  was_helpful: true | false,
  would_recommend: true | false,
  liked_most: "text...",
  improve: "text...",
  name: "optional",
  email: "optional"
}
```

---

## Supabase Connection Details

Your project credentials (already configured in the app):

- **Project URL**: `https://rkshstqcegtwjmmfailw.supabase.co`
- **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Table Name**: `feedback`

---

## Troubleshooting

### Feedback not saving?

- Check browser console for Supabase error messages
- Confirm the `feedback` table exists in your Supabase project
- Verify RLS policy allows `anon` inserts (Step 3)
- Make sure column names exactly match: `user_id`, `feature_used`, `overall_rating`, `was_helpful`, `would_recommend`, `liked_most`, `improve`, `name`, `email`

### Getting a 403 error?

- RLS is blocking the insert. Re-run the `CREATE POLICY "Allow public insert"` statement from Step 3.

### Seeing duplicate rows?

- Each feedback submission creates one row. If you see many, the user may have submitted multiple times. This is normal for an MVP.

---

## Future Improvements (Post-MVP)

- Add email notifications when new feedback is received (Supabase Edge Functions)
- Build an admin dashboard to visualize feedback trends
- Add rate limiting to prevent spam submissions
- Ask "How did you hear about us?" as an extra question
- Track NPS score over time
