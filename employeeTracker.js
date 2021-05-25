const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '12345',
  database: 'seed',
});

connection.connect((err) => {
  if (err) throw err;
  SelectTask();
});

const SelectTask = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Employees By Department',
        'View All Employees By Manager',
        'Add New Employee',
        'Remove Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'View All Roles',
        'Add New Role',
        'Remove Role',
        'View All Departments',
        'Add New Department',
        'Remove Department',
        'View Total Utilized Budget of Department',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Employees By Department":
          employeeByDepartment();
          break;

        case "View All Employees By Manager":
          employeesByManager();
          break;

        case "Add New Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Role":
          updateRole();
          break;

        case "Update Employee Manager":
          updateManager();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "Add New Role":
          addRole();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "Add New Department":
          addDepartment();
          break;

        case "Remove Department":
          removeDepartment();
          break;

        case "View Total Utilized Budget of Department":
          departmentBudget();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
}