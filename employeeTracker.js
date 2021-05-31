const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
// const { viewEmployees } = require("./lib/Employee");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",
  password: "12345",
  database: "businessDB",
});

connection.connect((err) => {
  if (err) throw err;
  SelectTask();
});

let SelectTask = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add New Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Add New Role",
        "Remove Role",
        "View All Departments",
        "Add New Department",
        "Remove Department",
        "View Total Utilized Budget of Department",
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

let viewEmployees = () => {
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
LEFT JOIN roles r 
	ON e.role_id = r.id
LEFT JOIN employees m
	ON e.manager_id = m.id
LEFT JOIN departments d
	ON r.id = d.id`;
  connection.query(query, (err, res) => {
    console.table(res);
    SelectTask();
  });
};

let addEmployee = () => {
  inquirer
  .prompt([
    {
      name: "firstName",
      type: "input",
      message: "Enter the employee's first name:",
    },
    {
      name: "lastName",
      type: "input",
      message: "Enter the employee's last name:",
    },
    {
      name: "role",
      type: "list",
      message: "Enter the employee's role:",
      choices() {
        connection.query(
          `SELECT
            title
          FROM roles`, 
          (err, res) => {
              if (err) throw err;
            const choiceArray = [];
            res.forEach(({ title }) => {
              choiceArray.push(title);
            });
            return choiceArray;
          },
        );
      },
    },
    {
      name: "manager",
      type: "list",
      choices() {
        connection.query(
          `SELECT
            first_name,
            last_name
          FROM employees
          WHERE role_id = 3`, 
          (err, res) => {
            if (err) throw err;
            const choiceArray = [];
            res.forEach(({ first_name, last_name }) => {
              choiceArray.push(first_name + " " + last_name);
            });
            return choiceArray;
          }
        );
      },
    },
  ])
  .then((answers) => {
    connection.query(
      "INSERT INTO employees SET ?",
      {
        first_name: answers.firstName,
        last_name: answers.lastName,
        role_id: getRoleId(),
        manager_id: managerId()
      },
      (err) => {
        if (err) throw err;
        SelectTask();
      }
    );
  })
};

const getRoleId = () => {
  connection.query('SELECT id FROM roles WHERE ?', 
    {
      title: answers.role,
    },
    (err, res) => {
      if (err) throw err;
      let roleId = [];
      res.forEach(({ id }) => {
        roleId.push(id);
      });
      return roleId; 
    },
  );
}

let managerId = () => {
  let manager = answers.manager.split(' ');
  connection.query(
    'SELECT id FROM employees WHERE ?',
    {
      first_name: manager[0],
      last_name: manager[1],
    },
    (err, res) => {
      if (err) throw err;
      let managerId;
        managerId = res.id;
      return managerId;
    },
  );
}