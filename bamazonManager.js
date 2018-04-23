var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  managerChoices();
});

function managerChoices() {
  inquirer.prompt([{
    type: "list",
    name: "manager_command",
    message: "Please select one",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
  }]).then(function (command) {
    switch (command.manager_command) {
      case "View Products for Sale":
        console.log("Listing products")
        viewProducts();
        break;
      case "View Low Inventory":
        lowInventory();
        break;
      case "Add to Inventory":
        addInventory();
        break;
      case "Add New Product":
        addProduct();
        break;
      default:
        console.log("Select a valid comand.");
        break;
    }
  })
}

function viewProducts() {
  connection.query("SELECT item_id,product_name, price, stock_quantity FROM products", function (err, res) {
    if (err) throw err;
    console.log("\n| id  |  Product Name  | Price ($)  |  stock quantity |  product sale  ");

    //Display all items that are for sale
    for (var i = 0; i < res.length; i++) {
      console.log("|  " + res[i].item_id + "  |  " + res[i].product_name + "  |  " + "  |      " + res[i].price + "    |     " + res[i].stock_quantity + "    |   "+ res[i].product_sale)
    }
    checkIfContinuing();
  });
}

function lowInventory() {
  connection.query("SELECT item_id,product_name, price, stock_quantity FROM products WHERE stock_quantity <5", function (err, res) {
    if (err) throw err;
    console.log("| id  |  Product Name  | Price ($)  |  stock quantity |  ");

    //Display all items that are for sale
    for (var i = 0; i < res.length; i++) {
      console.log("|  " + res[i].item_id + "  |  " + res[i].product_name + "  |  " + "  |      " + res[i].price + "    |     " + res[i].stock_quantity + "    |")
    }
    checkIfContinuing();
  });
}
//var arr = arrayItem();
function addInventory() {
  connection.query("SELECT product_name FROM products", function (err, res) {
    if (err) throw err;

    inquirer.prompt([{
        type: "list",
        name: "item",
        choices: function () {
          var arr = [];
          for (let item in res) {
            arr.push(res[item].product_name);
            //console.log(res[item].product_name)
          }
          return arr;
        },
        message: "Select inventory item"
      },
      {
        name: "quantity",
        type: "input",
        message: "Enter quantity?"
      }
    ]).then(function (answer) {
      var sql = "UPDATE products SET stock_quantity = stock_quantity + " + parseInt(answer.quantity) + " WHERE product_name = '" + answer.item + "'";
      console.log(sql);
      connection.query(
        sql,
        function (err, res) {
          if (err) console.log(err);
          console.log("Invetory is successfully updated");
          viewProducts();

        }
      );
    })
  })
}

function addProduct() {
  inquirer.prompt([{
      name: "item",
      type: "input",
      message: "Name of the new product?"
    }, {
      name: "dept",
      type: "input",
      message: "Enter the department?"
    },
    {
      name: "price",
      type: "input",
      message: "Enter the price of the item?"
    },
    {
      name: "quantity",
      type: "input",
      message: "Enter quantity?"
    }
  ]).then(function (answer) {
    if (chekIfExists(answer.item)) {
      console.log("The you selected already exists in the inventory. PLease edit the inventory.");
      addInventory();
      
    } else {
      var sql = "INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('" + answer.item + "','" + answer.dept + "','" + answer.price + "','" + answer.quantity + "')";
      console.log(sql);
      connection.query(sql, function (err, res) {
        viewProducts();
        
      })
    }
  })
}

function chekIfExists(item) {
  connection.query("SELECT product_name FROM products WHERE ?", [{
    product_name: item
  }], function (err, res) {
    if (err) throw err;
    if (res.length > 0) return true;
    else return false;
  })

}

function checkIfContinuing() {
  inquirer.prompt([{
  type: "list",
  name: "checker",
  choices: ["Yes","No"],
  message: "Do you wish to continue"
  }]).then (function(answer){
    if(answer.checker ==="Yes"){
      managerChoices();
    }
    else process.exit();
  });
}