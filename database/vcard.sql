create table vcards (
  id uuid primary key default gen_random_uuid(),
  name text,
  surname text,
  company text,
  phone text,
  email text,
  website text,
  address text,
  note text,
  slug text unique,
  qr_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
