-- Two spaces: AI Builders (free, every active member) and AI Builders Pro (paid).
-- memberships.status = 'active' means in AI Builders; tier = 'pro' adds AI Builders Pro.
ALTER TABLE memberships ADD COLUMN tier TEXT NOT NULL DEFAULT 'free';
ALTER TABLE posts ADD COLUMN space TEXT NOT NULL DEFAULT 'free';
CREATE INDEX posts_space ON posts(space, pinned DESC, created_at DESC);
