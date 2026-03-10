# Supabase Setup for Career Compass Chat Assistant

## Overview
The AI Career Assistant feature stores conversations in Supabase. To enable full persistence, you need to create a database table.

## Supabase Project Details
- **URL**: https://rkshstqcegtwjmmfailw.supabase.co
- **Project**: Career Compass

## Creating the Chat Messages Table

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your "Career Compass" project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the following SQL:

```sql
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant')),
  message TEXT NOT NULL
);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access (for the public API key)
CREATE POLICY "Allow anonymous reads" ON public.chat_messages
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous inserts" ON public.chat_messages
  FOR INSERT WITH CHECK (true);
```

6. Click **Run** to create the table

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase db push
```

## Verification

Once the table is created:

1. In Supabase Dashboard, go to **SQL Editor**
2. Run: `SELECT * FROM chat_messages;`
3. You should see the table structure with the columns listed above

## Testing the Feature

1. Navigate to `/assistant` in your Career Compass app
2. Click **Start Chat**
3. Try sending a message
4. Check Supabase Dashboard to see if messages are being saved

## Notes

- **API Key**: The public API key provided (`eyJhbGciOi...`) is used in the frontend
- **RLS Policies**: The SQL above sets up basic Row Level Security to allow anonymous reads and writes
- **Conversation Persistence**: Once the table exists, conversations will be saved across browser sessions
- **No Saved Conversation Yet**: Until you create the table, the chat will work but messages won't persist

## Troubleshooting

### "Could not find the table 'public.chat_messages'"
- The table hasn't been created yet
- Follow the setup steps above

### Messages aren't saving
- Check Supabase RLS policies are enabled correctly
- Verify the table was created with the correct columns
- Check browser console for error messages

### Need to reset messages?
Run in Supabase SQL Editor:
```sql
TRUNCATE public.chat_messages;
```
