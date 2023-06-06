-- migrate:up
ALTER TABLE orders ADD total_price DECIMAL(15,2) NULL;

-- migrate:down
ALTER TABLE orders DROP COLUMN total_price;
