--Create a MySQL Database called `bamazon`.
CREATE DATABASE bamazon;
--Then create a Table inside of that database called `products`.
--The products table should have each of the following columns:
--item_id (unique id for each product)
--product_name (Name of product)
--department_name
--price (cost to customer)
--stock_quantity (how much of the product is available in stores)
USE bamazon;
CREATE TABLE products
(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR (250),
  department_name VARCHAR (250),
  price DECIMAL (10,2),
  stock_quantity INT,
  PRIMARY KEY (item_id)
  )
  -- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
  INSERT INTO products
    (product_name,department_name,price,stock_quantity)
  VALUES
    ("Laptop", "Electronics", 550.00, 15),
    ("Cell Phone", "Electronics", 300.00, 20),
    ("Plastic Spoons 12pcs", "Kitchen", 3.50, 23),
    ("Iorn Spoon", "Kitchen", 3.50, 25),
    ("Plate", "Kitchen", 5.00, 12),
    ("Table", "Furniture", 129.99, 6),
    ("Chair", "Furniture", 29.99, 24),
    ("Blue Pen", "Stationary", 1.00, 200),
    ("Red Pen", "Stationary", 1.00, 200),
    ("Pencil", "Stationary", 0.20, 200),
    ("Guitar", "Music", 120, 5);
  
   
  CREATE TABLE departments
  (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR (250),
    over_head_costs DECIMAL (10,2),
    PRIMARY KEY (department_id)
  )

ALTER TABLE products
ADD product_sale DECIMAL (10,2);
  