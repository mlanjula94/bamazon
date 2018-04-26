# Bamazon

## Description
This is a command line apllication implemented as a storefront apllication. The application has three interfaces: cutomer, manager and supervisor

## npm Packages
* inquirer package
* mySql package

## Istructions
***In order to run this application, you should have the MySQL database already set up on your machine***

* To run the application in your machine first run the schema.sql in Sequel pro or MySql workbench and then type the following in terminal or gitbash. 
```
git@github.com:mlanjula94/bamazon.git
cd bamazon
npm install
```
### Customer interface
The comand to start the applicaton.
```
node bamazonCustomer.js
```
Then the application will display all the products available and you can follow the comand promt.
```
| id  |  Product Name  |  Department  | Price ($)  |  stock quantity | Product Sale
|  1  |  Laptop  |  Electronics  |    550   |    14    |    550    |
|  2  |  Cell Phone  |  Electronics  |    300   |    20    |    0    |
|  3  |  Plastic Spoons 12pcs  |  Kitchen  |    3.5   |    12    |    14    |
|  4  |  Iorn Spoon  |  Kitchen  |    3.5   |    20    |    10.5    |
|  5  |  Plate  |  Kitchen  |    5   |    17    |    0    |
|  6  |  Table  |  Furniture  |    129.99   |    2    |    129.99    |
|  7  |  Chair  |  Furniture  |    29.99   |    24    |    0    |
|  8  |  Blue Pen  |  Stationary  |    1   |    197    |    0    |
|  9  |  Red Pen  |  Stationary  |    1   |    188    |    7    |
|  10  |  Pencil  |  Stationary  |    0.2   |    199    |    0    |
|  11  |  Guitar  |  Music  |    120   |    4    |    0    |
|  12  |  Robot  |  Electronics  |    550   |    3    |    0    |
|  13  |  Vaccum          |  Electronics  |    155.65   |    7    |    0    |
|  14  |  Speakers  |  Electronics  |    65   |    5    |    0    |
? What is the ID of the item you would like to buy? 9
? How many would you like to buy? 3
3
Your total is $3

? Do you wish to continue (Use arrow keys)
❯ Yes
  No
```
### Manager interface
The comand to start the applicaton as a manager.
```
node bamazonManager.js
```
Then comand prompt will display the following and the manager can . 
```
? Please select one (Use arrow keys)
❯ View Products for Sale
  View Low Inventory
  Add to Inventory
  Add New Product
  ```
#### What each comand do
* `View Products for Sale`, will list every available item: the item IDs, names, prices, and quantities and product sale.
```
? Please select one View Products for Sale
Listing products

| id  |  Product Name  | Price ($)  |  stock quantity |  product sale
|  1  |  Laptop  |    |      550    |     14    |   550
|  2  |  Cell Phone  |    |      300    |     20    |   0
|  3  |  Plastic Spoons 12pcs  |    |      3.5    |     12    |   14
|  4  |  Iorn Spoon  |    |      3.5    |     20    |   10.5
|  5  |  Plate  |    |      5    |     17    |   0
|  6  |  Table  |    |      129.99    |     2    |   129.99
|  7  |  Chair  |    |      29.99    |     24    |   0
|  8  |  Blue Pen  |    |      1    |     197    |   0
|  9  |  Red Pen  |    |      1    |     185    |   10
|  10  |  Pencil  |    |      0.2    |     199    |   0
|  11  |  Guitar  |    |      120    |     4    |   0
|  12  |  Robot  |    |      550    |     3    |   0
|  13  |  Vaccum          |    |      155.65    |     7    |   0
|  14  |  Speakers  |    |      65    |     5    |   0
```

* `View Low Inventory`, will list all items with an inventory count lower than five.
```
? Please select one View Low Inventory
| id  |  Product Name  | Price ($)  |  stock quantity |
|  6  |  Table  |    |      129.99    |     2    |
|  11  |  Guitar  |    |      120    |     4    |
|  12  |  Robot  |    |      550    |     3    |
```

* `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
Select the item.
```
? Please select one Add to Inventory
? Select inventory item (Use arrow keys)
❯ Laptop
  Cell Phone
  Plastic Spoons 12pcs
  Iorn Spoon
  Plate
  Table
  Chair
(Move up and down to reveal more choices)
```
Enter the quantity.
```? Please select one Add to Inventory
? Select inventory item Vaccum
? Enter quantity? 2
UPDATE products SET stock_quantity = stock_quantity + 2 WHERE product_name = 'Vaccum    '
Invetory is successfully updated

| id  |  Product Name  | Price ($)  |  stock quantity |  product sale
|  1  |  Laptop  |    |      550    |     14    |   550
|  2  |  Cell Phone  |    |      300    |     20    |   0
|  3  |  Plastic Spoons 12pcs  |    |      3.5    |     12    |   14
|  4  |  Iorn Spoon  |    |      3.5    |     20    |   10.5
|  5  |  Plate  |    |      5    |     20    |   0
|  6  |  Table  |    |      129.99    |     2    |   129.99
|  7  |  Chair  |    |      29.99    |     24    |   0
|  8  |  Blue Pen  |    |      1    |     197    |   0
|  9  |  Red Pen  |    |      1    |     185    |   10
|  10  |  Pencil  |    |      0.2    |     199    |   0
|  11  |  Guitar  |    |      120    |     4    |   0
|  12  |  Robot  |    |      550    |     3    |   0
|  13  |  Vaccum          |    |      155.65    |     9    |   0
|  14  |  Speakers  |    |      65    |     5    |   0
```
* `Add New Product`, allows the manager to add a completely new product to the store.
```
? Please select one. Add New Product
? Name of the new product? Ipad
? Enter the department? Electronics
? Enter the price of the item? $300
? Enter quantity? 3

| id  |  Product Name  | Price ($)  |  stock quantity |  product sale
|  1  |  Laptop  |    |      550    |     14    |   550
|  2  |  Cell Phone  |    |      300    |     20    |   0
|  3  |  Plastic Spoons 12pcs  |    |      3.5    |     12    |   14
|  4  |  Iorn Spoon  |    |      3.5    |     20    |   10.5
|  5  |  Plate  |    |      5    |     20    |   0
|  6  |  Table  |    |      129.99    |     2    |   129.99
|  7  |  Chair  |    |      29.99    |     24    |   0
|  8  |  Blue Pen  |    |      1    |     197    |   0
|  9  |  Red Pen  |    |      1    |     185    |   10
|  10  |  Pencil  |    |      0.2    |     199    |   0
|  11  |  Guitar  |    |      120    |     4    |   0
|  12  |  Robot  |    |      550    |     3    |   0
|  13  |  Vaccum          |    |      155.65    |     9    |   0
|  14  |  Speakers  |    |      65    |     5    |   0
|  15  |  Speakers  |    |      65    |     5    |   null
? Do you wish to continue (Use arrow keys)
❯ Yes
  No
  ```
