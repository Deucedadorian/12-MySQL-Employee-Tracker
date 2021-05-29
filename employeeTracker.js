const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
// const { viewEmployees } = require("./lib/Employee");

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,
  
  user: 'root',
  password: '12345',
  database: 'businessDB',
});

connection.connect((err) => {
  if (err) throw err;
  SelectTask();
});

const SelectTask = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
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
};

const viewEmployees = () => {
  const query = `
  SELECT 
	e.id, 
    e.first_name, 
    e.last_name, 
    title, 
	d.name AS department,
	salary,
    m.first_name AS manager
FROM employees e
JOIN roles r 
	ON e.role_id = r.id
LEFT JOIN employees m
	ON e.manager_id = m.id
JOIN departments d
	ON r.id = d.id
ORDER BY e.id`;
  connection.query(query, (err, res) => {
    console.table(res);
    SelectTask();
  });
};

module.exports = connection;