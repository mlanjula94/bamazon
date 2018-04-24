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
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("| id  |  Product Name  |  Department  | Price ($)  |  stock quantity | Product Sale ");

    //Display all items that are for sale
    for (var i = 0; i < res.length; i++) {
      console.log("|  " + res[i].item_id + "  |  " + res[i].product_name + "  |  " + res[i].department_name + "  |    " + res[i].price + "   |    " + res[i].stock_quantity + "    |    " + res[i].product_sale + "    |")
    }

    //connection.end();
    buyProducts(res);
  });
}

function buyProducts(productsTable) {
  inquirer
    .prompt([{
        name: "id",
        type: "input",
        message: "What is the ID of the item you would like to buy?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
      }
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that inf
      var total = 0;

      for(var i = 0; i < productsTable.length; i++){
        if(parseInt(productsTable[i].item_id) === parseInt(answer.id)){
          total = parseFloat(productsTable[i].price)*parseInt(answer.quantity);
        }
      }
      console.log(total); 
      
      var sql = "UPDATE products SET stock_quantity = stock_quantity - " + parseInt(answer.quantity) + ", product_sale = product_sale +" + total + " WHERE item_id = " + parseInt(answer.id) + " AND stock_quantity > " + parseInt(answer.quantity);
      console.log(sql);
       connection.query(
         sql,
         function (err, res) {
           if (err) console.log(err);
           if (res.affectedRows === 0) {
             console.log("Please select a lower quantity than " + res.stock_quantity);
             buyProducts();
           } else {
            console.log("Your total is $" + total+"\n");
            checkIfContinuing();
           }
         }
       );
    });
}




function checkIfContinuing() {
  inquirer.prompt([{
  type: "list",
  name: "checker",
  choices: ["Yes","No"],
  message: "Do you wish to continue"
  }]).then (function(answer){
    if(answer.checker ==="Yes"){
      afterConnection();
    }
    else process.exit();
  });
}