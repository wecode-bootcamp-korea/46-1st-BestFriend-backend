-- migrate:up

ALTER TABLE carts ADD CONSTRAINT unique_carts UNIQUE (user_id, product_id)

-- migrate:down
