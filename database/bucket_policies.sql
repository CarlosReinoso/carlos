create policy "allow public access" on storage.objects
for select
using (bucket_id = 'luminous');

CREATE POLICY "Allow uploads" ON storage.objects FOR
  INSERT WITH CHECK (
    bucket_id = 'luminous' AND auth.role() = 'anon'
  );

  CREATE TABLE IF NOT EXISTS keanu_short_stories (
  id VARCHAR(255) NOT NULL, 
  title VARCHAR(255) NOT NULL, 
  preview TEXT, 
  page_count VARCHAR(255), 
  word_count VARCHAR(255), 
  reading_time VARCHAR(255), 
  year_written INT, 
  PRIMARY KEY (id)
);


-- Public can read
CREATE POLICY "Public read access"
ON keanu_short_stories
FOR SELECT
USING (true);


-- No public modifications 
CREATE POLICY "No public insert"
ON keanu_short_stories
FOR INSERT
TO public
WITH CHECK (false);

CREATE POLICY "No public update"
ON keanu_short_stories
FOR UPDATE
TO public
USING (false);

CREATE POLICY "No public delete"
ON keanu_short_stories
FOR DELETE
TO public
USING (false);



  -- Enable Row-Level Security (if not already enabled)
ALTER TABLE keanu_short_stories ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert not
CREATE POLICY allow_insert_for_anyone
ON keanu_short_stories
FOR INSERT
TO public
WITH CHECK (TRUE);
