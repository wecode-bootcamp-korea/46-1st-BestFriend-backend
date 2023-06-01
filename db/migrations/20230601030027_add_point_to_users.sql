-- migrate:up
ALTER TABLE users ADD point DECIMAL(15,2) NULL;

-- migrate:down
ALTER TABLE users DROP COLUMN point;
