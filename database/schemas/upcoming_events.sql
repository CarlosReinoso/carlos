CREATE TABLE IF NOT EXISTS upcoming_events (
  id VARCHAR(255) NOT NULL, 
  event_id VARCHAR(255) NOT NULL, 
  event_url TEXT, 
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  img_url TEXT, 
  title VARCHAR(255) NOT NULL, 
  event_date VARCHAR(255), 
  location VARCHAR(255), 
  price VARCHAR(255), 
  PRIMARY KEY (id)
);



ALTER TABLE public.upcoming_events
DROP CONSTRAINT IF EXISTS upcoming_events_pkey;


ALTER TABLE public.upcoming_events
ALTER COLUMN id SET DATA TYPE bigint USING id::bigint,
ALTER COLUMN id SET NOT NULL;


ALTER TABLE public.upcoming_events
ADD PRIMARY KEY (id);


CREATE SEQUENCE public.upcoming_events_id_seq;

ALTER TABLE public.upcoming_events
ALTER COLUMN id SET DEFAULT nextval('public.upcoming_events_id_seq');

------



