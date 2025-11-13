-- Neo Models & Assets Tables
-- Run in Supabase SQL editor to set up the Neo Instagram publishing system

-- ============================================
-- Neo Models Table
-- Stores Instagram accounts and AI model definitions
-- ============================================
CREATE TABLE IF NOT EXISTS neo_models (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  model_id TEXT UNIQUE NOT NULL, -- e.g. "milamonreo", "neo-monroe", "aria-nova"
  name TEXT NOT NULL,
  handle TEXT, -- Instagram handle without @
  niche TEXT,
  ig_user_id TEXT, -- Instagram Graph API user ID
  ig_access_token TEXT, -- Long-lived access token (encrypted in production)
  token_expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- Indexes for neo_models
CREATE INDEX IF NOT EXISTS neo_models_model_id_idx ON neo_models(model_id);
CREATE INDEX IF NOT EXISTS neo_models_ig_user_id_idx ON neo_models(ig_user_id);
CREATE INDEX IF NOT EXISTS neo_models_is_active_idx ON neo_models(is_active);

-- ============================================
-- Neo Assets Table
-- Stores uploaded media files (images, reels, stories)
-- ============================================
CREATE TABLE IF NOT EXISTS neo_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  model_id UUID REFERENCES neo_models(id) ON DELETE SET NULL,
  media_type TEXT NOT NULL DEFAULT 'IMAGE' CHECK (media_type IN ('IMAGE', 'REEL', 'STORY')),
  file_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  file_name TEXT,
  file_size BIGINT, -- Size in bytes
  mime_type TEXT,
  caption TEXT,
  metadata JSONB, -- Store additional metadata (dimensions, duration, etc.)
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- Indexes for neo_assets
CREATE INDEX IF NOT EXISTS neo_assets_model_id_idx ON neo_assets(model_id);
CREATE INDEX IF NOT EXISTS neo_assets_media_type_idx ON neo_assets(media_type);
CREATE INDEX IF NOT EXISTS neo_assets_created_at_idx ON neo_assets(created_at DESC);
CREATE INDEX IF NOT EXISTS neo_assets_uploaded_by_idx ON neo_assets(uploaded_by);

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE neo_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE neo_assets ENABLE ROW LEVEL SECURITY;

-- Neo Models Policies
CREATE POLICY "Users can view all active neo models"
  ON neo_models FOR SELECT
  USING (is_active = true OR auth.uid() = created_by);

CREATE POLICY "Users can insert their own neo models"
  ON neo_models FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own neo models"
  ON neo_models FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own neo models"
  ON neo_models FOR DELETE
  USING (auth.uid() = created_by);

-- Neo Assets Policies
CREATE POLICY "Users can view their own neo assets"
  ON neo_assets FOR SELECT
  USING (auth.uid() = uploaded_by);

CREATE POLICY "Users can insert their own neo assets"
  ON neo_assets FOR INSERT
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can update their own neo assets"
  ON neo_assets FOR UPDATE
  USING (auth.uid() = uploaded_by)
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can delete their own neo assets"
  ON neo_assets FOR DELETE
  USING (auth.uid() = uploaded_by);

-- ============================================
-- Neo Scheduled Posts Table
-- Stores posts queued for future publishing
-- ============================================
CREATE TABLE IF NOT EXISTS neo_scheduled_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  model_id UUID REFERENCES neo_models(id) NOT NULL,
  asset_id UUID REFERENCES neo_assets(id) ON DELETE SET NULL,
  media_type TEXT NOT NULL DEFAULT 'IMAGE' CHECK (media_type IN ('IMAGE', 'REEL', 'STORY', 'CAROUSEL')),
  caption TEXT,
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  reel_cover_url TEXT,
  carousel_children JSONB, -- array of media URLs/asset references for carousel posts
  extra_payload JSONB, -- platform-specific options (stickers, mentions, etc.)
  scheduled_for TIMESTAMPTZ NOT NULL,
  timezone TEXT DEFAULT 'UTC',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'published', 'failed', 'cancelled')),
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  last_attempt_at TIMESTAMPTZ,
  ig_container_id TEXT,
  ig_media_id TEXT,
  error_message TEXT,
  publish_response JSONB,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- Indexes for neo_scheduled_posts
CREATE INDEX IF NOT EXISTS neo_sched_posts_model_id_idx ON neo_scheduled_posts(model_id);
CREATE INDEX IF NOT EXISTS neo_sched_posts_status_idx ON neo_scheduled_posts(status);
CREATE INDEX IF NOT EXISTS neo_sched_posts_scheduled_for_idx ON neo_scheduled_posts(scheduled_for);
CREATE INDEX IF NOT EXISTS neo_sched_posts_created_by_idx ON neo_scheduled_posts(created_by);

-- RLS for neo_scheduled_posts
ALTER TABLE neo_scheduled_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own scheduled posts"
  ON neo_scheduled_posts FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can insert their own scheduled posts"
  ON neo_scheduled_posts FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own scheduled posts"
  ON neo_scheduled_posts FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own scheduled posts"
  ON neo_scheduled_posts FOR DELETE
  USING (auth.uid() = created_by);

-- Trigger to update updated_at on neo_scheduled_posts
CREATE OR REPLACE FUNCTION update_neo_scheduled_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_neo_scheduled_posts_updated_at
  BEFORE UPDATE ON neo_scheduled_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_neo_scheduled_posts_updated_at();

-- ============================================
-- Triggers
-- ============================================
-- Auto-update updated_at for neo_models
CREATE OR REPLACE FUNCTION update_neo_models_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_neo_models_updated_at
  BEFORE UPDATE ON neo_models
  FOR EACH ROW
  EXECUTE FUNCTION update_neo_models_updated_at();

-- ============================================
-- Initial Data: Insert your two Instagram accounts
-- ============================================
-- Note: Replace 'your-user-id' with actual auth.users id if needed
-- These will be inserted when you run the SQL, but you'll need to add tokens manually

INSERT INTO neo_models (model_id, name, handle, ig_user_id, is_active)
VALUES
  ('milamonreo', 'Mila Monroe', 'milamonreo', '17841478234315890', true),
  ('neo-monroe', 'Neo Monroe', 'neo.monroe_', '17841477972957485', true)
ON CONFLICT (model_id) DO NOTHING;


-- ============================================
-- Sample Data for Development
-- ============================================

-- Sample assets for existing models
INSERT INTO neo_assets (
  model_id,
  media_type,
  file_path,
  public_url,
  file_name,
  file_size,
  mime_type,
  caption,
  metadata
)
SELECT
  id,
  'IMAGE',
  'neo/welcome-drop.jpg',
  'https://znkasxqfakeaxrmuuya.supabase.co/storage/v1/object/public/images/neo/welcome-drop.jpg',
  'welcome-drop.jpg',
  450123,
  'image/jpeg',
  'Launching the new Neo Studio visuals. Tap if you''re ready for the next drop.',
  jsonb_build_object('prompt', 'cyberpunk neon studio portrait', 'aspect_ratio', '4:5')
FROM neo_models
WHERE model_id = 'neo-monroe'
ON CONFLICT DO NOTHING;

INSERT INTO neo_assets (
  model_id,
  media_type,
  file_path,
  public_url,
  file_name,
  file_size,
  mime_type,
  caption,
  metadata
)
SELECT
  id,
  'IMAGE',
  'neo/mila-lookbook.jpg',
  'https://znkasxqfakeaxrmuuya.supabase.co/storage/v1/object/public/images/neo/mila-lookbook.jpg',
  'mila-lookbook.jpg',
  389774,
  'image/jpeg',
  'Mila Monroe // Lookbook Vol. 04 — AI couture with organic textures.',
  jsonb_build_object('prompt', 'editorial fashion shoot', 'aspect_ratio', '4:5')
FROM neo_models
WHERE model_id = 'milamonreo'
ON CONFLICT DO NOTHING;


