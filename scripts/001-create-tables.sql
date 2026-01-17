-- Coding Sprout Database Schema

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'parent' CHECK (role IN ('parent', 'admin', 'instructor')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Children/Students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  date_of_birth DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  grade_level_min TEXT NOT NULL,
  grade_level_max TEXT NOT NULL,
  class_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  price_cents INTEGER NOT NULL,
  charter_school_price_cents INTEGER,
  one_on_one_price_cents INTEGER,
  max_spots INTEGER NOT NULL,
  spots_taken INTEGER DEFAULT 0,
  allows_one_on_one BOOLEAN DEFAULT false,
  is_online BOOLEAN DEFAULT false,
  zoom_link TEXT,
  location TEXT,
  instructor_id UUID REFERENCES profiles(id),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Class registrations
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  is_one_on_one BOOLEAN DEFAULT false,
  payment_method TEXT CHECK (payment_method IN ('stripe', 'charter_school')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'charter_pending', 'charter_approved')),
  stripe_payment_intent_id TEXT,
  charter_school_name TEXT,
  charter_school_contact TEXT,
  amount_paid_cents INTEGER,
  registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  is_online BOOLEAN DEFAULT false,
  image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery/Photos table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  student_name TEXT,
  project_name TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT,
  donor_email TEXT,
  amount_cents INTEGER NOT NULL,
  stripe_payment_intent_id TEXT,
  message TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Volunteer applications
CREATE TABLE IF NOT EXISTS volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  availability TEXT,
  skills TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings for hidden pages
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES 
  ('store_visible', 'false'),
  ('team_visible', 'false')
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Students policies
CREATE POLICY "Parents can view own students" ON students FOR SELECT USING (parent_id = auth.uid());
CREATE POLICY "Parents can insert own students" ON students FOR INSERT WITH CHECK (parent_id = auth.uid());
CREATE POLICY "Parents can update own students" ON students FOR UPDATE USING (parent_id = auth.uid());
CREATE POLICY "Parents can delete own students" ON students FOR DELETE USING (parent_id = auth.uid());

-- Classes policies (public read for published classes)
CREATE POLICY "Anyone can view published classes" ON classes FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage classes" ON classes FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Registrations policies
CREATE POLICY "Parents can view own registrations" ON registrations FOR SELECT USING (parent_id = auth.uid());
CREATE POLICY "Parents can create registrations" ON registrations FOR INSERT WITH CHECK (parent_id = auth.uid());
CREATE POLICY "Admins can manage registrations" ON registrations FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Events policies (public read for published events)
CREATE POLICY "Anyone can view published events" ON events FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage events" ON events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Gallery policies (public read for published photos)
CREATE POLICY "Anyone can view published gallery" ON gallery FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage gallery" ON gallery FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Donations policies
CREATE POLICY "Anyone can create donations" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view donations" ON donations FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Contact submissions policies
CREATE POLICY "Anyone can submit contact form" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage contact submissions" ON contact_submissions FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Volunteer applications policies
CREATE POLICY "Anyone can submit volunteer application" ON volunteer_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage volunteer applications" ON volunteer_applications FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Site settings policies
CREATE POLICY "Anyone can read site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can update site settings" ON site_settings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update spots when registration is created
CREATE OR REPLACE FUNCTION update_class_spots()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE classes SET spots_taken = spots_taken + 1 WHERE id = NEW.class_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE classes SET spots_taken = spots_taken - 1 WHERE id = OLD.class_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update spots
DROP TRIGGER IF EXISTS on_registration_change ON registrations;
CREATE TRIGGER on_registration_change
  AFTER INSERT OR DELETE ON registrations
  FOR EACH ROW EXECUTE FUNCTION update_class_spots();
