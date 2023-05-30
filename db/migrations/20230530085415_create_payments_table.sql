-- migrate:up
CREATE TABLE payments(
  id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL, 
  total_price DECIMAL(10,0) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id)
)

-- migrate:down
DROP TABLE payments;
