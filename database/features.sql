create table features (
  amara_next_chapter integer default 0,
  amara_comment integer default 0,
  updated_at timestamptz default now()
  id BIGSERIAL PRIMARY KEY, 
);


-- make a function to autoincrement

create or replace function increment_feature(field_name text)
returns void as $$
begin
  execute format('
    update features set %I = %I + 1 where id = 1;
  ', field_name, field_name);
end;
$$ language plpgsql;

-- auto update
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on features
for each row
execute procedure update_updated_at_column();
