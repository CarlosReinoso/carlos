CREATE TABLE public.originals (
    id BIGSERIAL PRIMARY KEY, -- Auto-incrementing ID
    name TEXT NOT NULL, -- Name of the product
    description TEXT, -- Description of the product
    material TEXT, -- Material of the product
    size TEXT, -- Size of the product
    url TEXT, -- URL (e.g., for an image or product page)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Timestamp for record creation
);
