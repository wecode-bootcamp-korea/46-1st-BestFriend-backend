-- migrate:up
CREATE TABLE order_item_status_code(
  id INT NOT NULL AUTO_INCREMENT,
  order_item_id INT NOT NULL, 
  code_type VARCHAR(20) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT product_status_code_order_items_id_fkey FOREIGN KEY (order_items_id) REFERENCES order_items(id)
)
-- migrate:down
DROP TABLE order_item_status_code;
