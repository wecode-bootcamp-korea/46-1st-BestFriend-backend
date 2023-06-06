-- migrate:up
ALTER TABLE reviews ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

-- migrate:down
ALTER TABLE reviews DROP COLUMN created_at;

