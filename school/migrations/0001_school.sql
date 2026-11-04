-- School: one community (Carlos's), members, feed, likes, follows, DMs and notifications.
-- Login is by Google or a 6-digit e-mailed code; no passwords are stored.
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT,
  handle TEXT UNIQUE COLLATE NOCASE,
  bio TEXT,
  location TEXT,
  avatar_url TEXT,
  google_sub TEXT UNIQUE,
  points INTEGER NOT NULL DEFAULT 0,      -- one per like received; drives the level
  created_at INTEGER NOT NULL,
  last_active_at INTEGER
);

-- Only a SHA-256 hash of each session token is stored; the token itself lives in the user's cookie.
CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);
CREATE INDEX sessions_user ON sessions(user_id);

CREATE TABLE login_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL COLLATE NOCASE,
  code_hash TEXT NOT NULL,
  ip TEXT,
  attempts INTEGER NOT NULL DEFAULT 0,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX login_codes_email ON login_codes(email, created_at);
CREATE INDEX login_codes_ip ON login_codes(ip, created_at);

-- One row per person who has applied. status: pending (answered, not paid) | active | canceled.
CREATE TABLE memberships (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  answers TEXT,                           -- JSON of the join questions
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  applied_at INTEGER NOT NULL,
  joined_at INTEGER,
  updated_at INTEGER
);

CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  pinned INTEGER NOT NULL DEFAULT 0,
  like_count INTEGER NOT NULL DEFAULT 0,
  comment_count INTEGER NOT NULL DEFAULT 0,
  last_comment_at INTEGER,
  created_at INTEGER NOT NULL
);
CREATE INDEX posts_recent ON posts(pinned DESC, created_at DESC);
CREATE INDEX posts_user ON posts(user_id, created_at);

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  like_count INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
CREATE INDEX comments_post ON comments(post_id, created_at);
CREATE INDEX comments_user ON comments(user_id, created_at);

-- author_id is copied in so points and the activity map don't need a join.
CREATE TABLE likes (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('post', 'comment')),
  target_id INTEGER NOT NULL,
  author_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, target_type, target_id)
);
CREATE INDEX likes_user ON likes(user_id, created_at);
CREATE INDEX likes_target ON likes(target_type, target_id);

CREATE TABLE follows (
  follower_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  followee_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (follower_id, followee_id)
);
CREATE INDEX follows_followee ON follows(followee_id);

CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  read_at INTEGER
);
CREATE INDEX messages_pair ON messages(sender_id, recipient_id, created_at);
CREATE INDEX messages_inbox ON messages(recipient_id, read_at);

-- type: like_post | like_comment | comment | reply | follow | announcement
CREATE TABLE notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  actor_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  post_id INTEGER,
  comment_id INTEGER,
  created_at INTEGER NOT NULL,
  read_at INTEGER
);
CREATE INDEX notifications_user ON notifications(user_id, created_at);
