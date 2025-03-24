CREATE TABLE public.keep_alive (
    id BIGSERIAL PRIMARY KEY, -- Auto-incrementing ID
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
