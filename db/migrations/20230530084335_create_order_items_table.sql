-- migrate:up
CREATE TABLE order_items(
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  order_id INT NOT NULL,
  quantity INT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id)
)
-- migrate:down
DROP TABLE order_items;
