CREATE DATABASE  IF NOT EXISTS comparison_grid_cat;

USE comparison_grid_cat;

CREATE TABLE IF NOT EXISTS product (
  product_id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(255) NOT NULL,
  shipping_cost VARCHAR(255) NOT NULL,
  customer_rating VARCHAR(255) NOT NULL,
  sold_by VARCHAR(50) NOT NULL,
  PRIMARY KEY(product_id)
);

CREATE TABLE IF NOT EXISTS category (
	category_id int NOT NULL AUTO_INCREMENT,
	belongs_to int,
	category_name VARCHAR(255) NOT NULL,
	category_value VARCHAR(255) NOT NULL,
	PRIMARY KEY(category_id),
	FOREIGN KEY (category_id) REFERENCES product(product_id)
);