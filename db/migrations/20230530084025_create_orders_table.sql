-- migrate:up
CREATE TABLE orders(
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_number VARCHAR(255) NOT NULL,
  address VARCHAR(100) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
)

-- migrate:down
DROP TABLE orders;
