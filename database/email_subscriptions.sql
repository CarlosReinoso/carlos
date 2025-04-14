create table email_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  tags text[] not null,
  created_at timestamp with time zone default now()
);

-- Optional: Ensure no duplicate emails for the same tag set
create unique index on email_subscriptions (email, tags);
