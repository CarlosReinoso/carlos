create policy "allow public access" on storage.objects
for select
using (bucket_id = 'luminous');

CREATE POLICY "public read access to music bucket"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'music');


  -- Enable Row-Level Security (if not already enabled)
ALTER TABLE vcards ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert not
CREATE POLICY allow_insert_for_anyone
ON vcards
FOR INSERT
TO public
WITH CHECK (TRUE);

-- Allow deleting only files in the `vcards/` folder of the `images` bucket
CREATE POLICY "Allow delete from vcards"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'images' AND
    name LIKE 'vcards/%'
  );
