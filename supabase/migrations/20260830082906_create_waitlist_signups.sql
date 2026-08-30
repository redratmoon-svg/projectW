/*
# Create Whispr waitlist signups

1. New Tables
- `waitlist_signups`
- `id` (uuid, primary key): Unique identifier for each signup.
- `email` (text, unique): The email address submitted for early access.
- `created_at` (timestamptz): The time the signup was recorded.

2. Security
- Row-level security is enabled on `waitlist_signups`.
- Anonymous visitors may submit an email address.
- Anonymous visitors cannot read, edit, or delete waitlist entries.
- Authenticated clients follow the same intentionally restricted access model.

3. Important Notes
- Email addresses are normalized by the application before insertion.
- Duplicate email submissions are rejected by the unique constraint and surfaced as a friendly confirmation in the interface.
*/

CREATE TABLE IF NOT EXISTS public.waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit waitlist email" ON public.waitlist_signups;
CREATE POLICY "Public can submit waitlist email"
  ON public.waitlist_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (length(trim(email)) BETWEEN 3 AND 320);

DROP POLICY IF EXISTS "Waitlist entries are not publicly readable" ON public.waitlist_signups;
CREATE POLICY "Waitlist entries are not publicly readable"
  ON public.waitlist_signups
  FOR SELECT
  TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "Waitlist entries are not publicly editable" ON public.waitlist_signups;
CREATE POLICY "Waitlist entries are not publicly editable"
  ON public.waitlist_signups
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "Waitlist entries are not publicly deletable" ON public.waitlist_signups;
CREATE POLICY "Waitlist entries are not publicly deletable"
  ON public.waitlist_signups
  FOR DELETE
  TO anon, authenticated
  USING (false);
