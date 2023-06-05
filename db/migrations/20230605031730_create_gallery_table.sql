-- migrate:up
CREATE TABLE gallery(
  id INT NOT NULL AUTO_INCREMENT,
  image_url VARCHAR(300) NOT NULL, 
  user_id INT NULL,
  PRIMARY KEY(id),
  CONSTRAINT gallery_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE gallery;
