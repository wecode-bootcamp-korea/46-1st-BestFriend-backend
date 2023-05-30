-- migrate:up
CREATE TABLE product_status_code(
  id INT NOT NULL AUTO_INCREMENT,
  order_items_id INT NOT NULL, 
  description VARCHAR(20) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT product_status_code_order_items_id_fkey FOREIGN KEY (order_items_id) REFERENCES order_items(id)
)
-- migrate:down
DROP TABLE product_status_code;
