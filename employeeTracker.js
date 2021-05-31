const util = require('util');
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { promisify } = require('util');

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",
  password: "12345",
  database: "businessDB",
});

const queryAsync = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
  if (err) throw err;
  SelectTask();
});

let SelectTask = async () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        // "View All Employees",
        // "View All Employees By Department",
        // "View All Employees By Manager",
        "Add New Employee",
        // "Remove Employee",
        // "Update Employee Role",
        // "Update Employee Manager",
        // "View All Roles",
        // "Add New Role",
        // "Remove Role",
        // "View All Departments",
        // "Add New Department",
        // "Remove Department",
        // "View Total Utilized Budget of Department",
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

// let viewEmployees = () => {
//   const query = `
//   SELECT 
// 	e.id, 
//     e.first_name, 
//     e.last_name, 
//     title, 
// 	d.name AS department,
// 	salary,
//     m.first_name AS manager
// FROM employees e
// LEFT JOIN roles r 
// 	ON e.role_id = r.id
// LEFT JOIN employees m
// 	ON e.manager_id = m.id
// LEFT JOIN departments d
// 	ON r.id = d.id`;
//   connection.query(query, (err, res) => {
//     console.table(res);
//     SelectTask();
//   });
// };

const addEmployee = () => {
  Promise.all([getRoles(), getManagers()])
    .then(([ roles, managers ]) =>
    // maybe here is the only place for a query.. So Ill have to make the right one.
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
        choices: roles,
      },
      {
        name: "manager",
        type: "list",
        choices: managers,
      },
    ]))
    .then((answers) => {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: Number(answers.role),
          manager_id: Number(answers.manager)
        },
        (err) => {
          if (err) throw err;
          SelectTask();
        }
      );
    })
};

// let getRoleId = () => {
//   connection.query('SELECT id FROM roles WHERE ?', 
//     {
//       title: answers.role,
//     },
//     (err, res) => {
//       if (err) throw err;
//       let roleId = [];
//       res.forEach(({ id }) => {
//         roleId.push(id);
//       });
//       return roleId; 
//     },
//   );
// };

// let managerId = () => {
//   let manager = answers.manager.split(' ');
//   connection.query(
//     'SELECT id FROM employees WHERE ?',
//     {
//       first_name: manager[0],
//       last_name: manager[1],
//     },
//     (err, res) => {
//       if (err) throw err;
//       let managerId;
//         managerId = res.id;
//       return managerId;
//     },
//   );
// };

let getRoles = async () => {
  // await connection.query(
  //   `SELECT
  //     title
  //   FROM roles`, 
  //   (err, res) => {
  //       if (err) throw err;
  //       console.log(res);
  //       const choiceArray = [];
  //     res.forEach(({ title }) => {
  //       choiceArray.push(title);
  //     });
  //     console.log(choiceArray);
  //     return choiceArray;
  //   }
  // );
  try {
    const rows = await queryAsync("SELECT * FROM roles");
    return rows.map((role) => ({name: role.title, value: role.id}));
  } catch (err) {
      console.log(`Err at getRoles,`, err);
  }
};

let getManagers = async () => {
  // connection.query(
  //   `SELECT
  //     first_name,
  //     last_name
  //   FROM employees
  //   WHERE role_id = 3`, 
  //   (err, res) => {
  //     if (err) throw err;
  //     const choiceArray = [];
  //     res.forEach(({ first_name, last_name }) => {
  //       // Maybe here filter out repeats..
  //       choiceArray.push(first_name + " " + last_name);
  //     });
  //     return choiceArray;
  //   }
  // );
  try {
    const rows = await queryAsync("SELECT first_name, last_name, id FROM employees WHERE role_id = 3");
    return rows.map((manager) => ({name: `${manager.first_name} ${manager.last_name}`, value: manager.id}));
  } catch (err) {
      console.log(`Err at getRoles,`, err);
  }
};
