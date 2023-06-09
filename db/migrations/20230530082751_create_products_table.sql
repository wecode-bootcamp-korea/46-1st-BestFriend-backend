-- migrate:up
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  sub_category_id INT NOT NULL,
  name VARCHAR(20) NOT NULL,
  description VARCHAR(1000) NULL,
  price DECIMAL(7,0) NOT NULL,
  image_url VARCHAR(300) NOT NULL,
  is_flower_included BOOLEAN NULL,
  is_berry_included BOOLEAN NULL,
  PRIMARY KEY(id),
  CONSTRAINT products_sub_category_id_fkey FOREIGN KEY (sub_category_id) REFERENCES sub_categories(id)
)

-- migrate:down
DROP TABLE products;
