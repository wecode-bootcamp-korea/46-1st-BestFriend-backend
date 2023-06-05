-- migrate:up
CREATE TABLE likes(
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT unique_user_id_product_id UNIQUE (user_id, product_id),
  CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT likes_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id)
);

-- migrate:down

