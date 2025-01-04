create policy "allow public access" on storage.objects
for select
using (bucket_id = 'luminous');

CREATE POLICY "Allow uploads" ON storage.objects FOR
  INSERT WITH CHECK (
    bucket_id = 'luminous' AND auth.role() = 'anon'
  );