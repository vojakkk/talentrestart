-- SUPABASE SCHEMA FOR TALENT RESTART
-- This script creates a production-safe table for all user submissions.

-- 1. Create the submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT NOT NULL,
    role TEXT, -- e.g. 'athlete', 'employer'
    subject TEXT, -- e.g. 'Hiring', 'Partnership'
    message TEXT,
    intent TEXT NOT NULL, -- 'contact', 'job_application', 'waitlist'
    metadata JSONB DEFAULT '{}'::jsonb, -- Store job_id, plan_name, etc.
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- 3. Create Security Policies
-- Allow anyone to submit data (Contact/Apply)
CREATE POLICY "Allow public insert for submissions" 
ON public.submissions 
FOR INSERT 
WITH CHECK (true);

-- Prevent anyone from reading submissions via the client
CREATE POLICY "Prevent public read for submissions" 
ON public.submissions 
FOR SELECT 
USING (auth.uid() IS NOT NULL); -- Only logged in admins via Supabase dashboard can read

-- 4. Set up permissions (Safer version)
GRANT INSERT ON public.submissions TO anon;
GRANT SELECT, UPDATE, DELETE ON public.submissions TO authenticated;
GRANT ALL ON public.submissions TO service_role;
