CREATE DATABASE  IF NOT EXISTS comparison_grid;

USE comparison_grid;

CREATE TABLE IF NOT EXISTS main_product (
  product_id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(255) NOT NULL,
  shipping_cost VARCHAR(255) NOT NULL,
  customer_rating VARCHAR(255) NOT NULL,
  sold_by VARCHAR(50) NOT NULL,
  PRIMARY KEY(product_id)
);

CREATE TABLE IF NOT EXISTS product_clone (
  clone_id int NOT NULL AUTO_INCREMENT,
  clone_of int,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(255) NOT NULL,
  shipping_cost VARCHAR(255) NOT NULL,
  customer_rating VARCHAR(255) NOT NULL,
  sold_by VARCHAR(50) NOT NULL,
  PRIMARY KEY(clone_id),
  FOREIGN KEY (clone_of) REFERENCES main_product(product_id)
)

/*
Run
mysql -u root -p < schema.sql
from the command line in the database folder
change 'root' to your username
*/
