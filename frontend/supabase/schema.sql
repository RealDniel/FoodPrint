-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scan_history table
CREATE TABLE IF NOT EXISTS public.scan_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  food_name TEXT NOT NULL,
  food_category TEXT NOT NULL,
  carbon_footprint DECIMAL(10,2) NOT NULL,
  water_usage DECIMAL(10,2) NOT NULL,
  sustainability_score DECIMAL(10,2) NOT NULL CHECK (sustainability_score >= 0 AND sustainability_score <= 100),
  scan_date DATE NOT NULL,
  image_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view all profiles for leaderboard" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own scan history" ON public.scan_history;
DROP POLICY IF EXISTS "Users can view all scan history for leaderboard" ON public.scan_history;
DROP POLICY IF EXISTS "Users can insert own scan history" ON public.scan_history;
DROP POLICY IF EXISTS "Users can update own scan history" ON public.scan_history;
DROP POLICY IF EXISTS "Users can delete own scan history" ON public.scan_history;

-- Create policies for profiles table
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow all authenticated users to view profile names for leaderboard purposes
CREATE POLICY "Users can view all profiles for leaderboard" ON public.profiles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for scan_history table
CREATE POLICY "Users can view own scan history" ON public.scan_history
  FOR SELECT USING (auth.uid() = user_id);

-- Allow all authenticated users to view scan data for leaderboard purposes
CREATE POLICY "Users can view all scan history for leaderboard" ON public.scan_history
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert own scan history" ON public.scan_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scan history" ON public.scan_history
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own scan history" ON public.scan_history
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user profile creation (trigger version)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RPC function for manual profile creation
CREATE OR REPLACE FUNCTION public.create_user_profile(
  user_id UUID,
  user_email TEXT,
  user_full_name TEXT
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (user_id, user_email, user_full_name)
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: Trigger setup may need to be done manually in Supabase dashboard
-- if automatic profile creation doesn't work

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scan_history_user_id ON public.scan_history(user_id);
CREATE INDEX IF NOT EXISTS idx_scan_history_scan_date ON public.scan_history(scan_date);
CREATE INDEX IF NOT EXISTS idx_scan_history_user_date ON public.scan_history(user_id, scan_date);
