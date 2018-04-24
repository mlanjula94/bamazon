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

var checker;

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  supChoices();
});

function supChoices() {
  inquirer.prompt([{
    type: "list",
    name: "sup_command",
    message: "Please select one",
    choices: ["View Sales", "Create department"]
  }]).then(function (command) {
    switch (command.sup_command) {
      case "View Sales":
        console.log("Listing Sales")
        viewSales();
        break;
      case "Create department":
        createDepartment();
        break;
      default:
        console.log("Select a valid comand.");
        break;
    }
  })
}

function viewSales() {
  var sql = "SELECT a.`department_name`, `SUM(product_sale)` as product_sale, department_id,`over_head_costs`" +
    " FROM departments" +
    " INNER JOIN (SELECT SUM(product_sale),`department_name` " +
    " FROM products" +
    " GROUP BY department_name) a" +
    " ON departments.department_name = a.department_name";

  //console.log(sql);
  connection.query(
    sql,
    function (err, res) {
      if (err) console.log(err);
      //console.log(res);
      console.log("| department_id | department_name | over_head_costs | product_sales | total_profit |");
      for (var i = 0; i < res.length; i++) {
        var profit = parseInt(res[i].product_sale) - parseInt(res[i].over_head_costs);
        console.log("|\t" + res[i].department_id + "\t | \t" + res[i].department_name + " | \t" + res[i].over_head_costs + "\t| \t" + res[i].product_sale + "\t | \t" + profit);
      }
      checkIfContinuing();

    })
}

function createDepartment() {
  inquirer.prompt([{
      name: "dept",
      type: "input",
      message: "Enter the department?"
    },
    {
      name: "cost",
      type: "input",
      message: "Enter the over head cost?"
    }
  ]).then(function (answer) {
    connection.query("SELECT department_name FROM departments WHERE ?", [{
      department_name: answer.dept
    }], function (err, res) {
      if (err) throw err;
      if (res.length > 0) {
        checker = true;
      } else(checker = false);
      if (checker) {
        console.log("The you selected already exists in the inventory. PLease edit the inventory.");
        checkIfContinuing();
      } else {
        var sql_insert = "INSERT INTO departments (department_name,over_head_costs) VALUES ('" + answer.dept + ", " + answer.cost + ")";
        connection.query(sql_insert, function (err, res) {
          console.log("Department database updated");
          checkIfContinuing();
        })

      }
    })
  })
}

function checkIfContinuing() {
  inquirer.prompt([{
    type: "list",
    name: "checker",
    choices: ["Yes", "No"],
    message: "Do you wish to continue"
  }]).then(function (answer) {
    if (answer.checker === "Yes") {
      supChoices();
    } else process.exit();
  });
}