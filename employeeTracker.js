const inquirer = require('inquirer');
const cTable = require('console.table');
const { connection } = require('./connection');
const { viewEmployees } = require('./src/viewEmployees');
const { departmentBudget } = require('./src/departmentBudget');
const { viewDepartments } = require('./src/viewDepartments');
const { viewRoles } = require('./src/viewRoles');
const { employeesByManager } = require('./src/employeesByManager');
const { addDepartment } = require('./src/addDepartment');
const { addEmployee } = require('./src/addEmployee');
const { updateEmpolyee } = require('./src/updateEmployee');
const { removeEmployee } = require('./src/removeEmployee');
const { addRole } = require('./src/addRole');
const { removeRole } = require('./src/removeRole');
const { removeDepartment } = require('./src/removeDepartment');

connection.connect((err) => {
  if (err) throw err;
  selectTask();
});

let selectTask = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Employees by Manager',
        'View All Roles',
        'View All Departments',
        'View Total Utilized Budget of Department',
        'Add New Employee',
        'Add New Role',
        'Add New Department',
        'Update Employee',
        'Remove Employee',
        'Remove Role',
        'Remove Department',
        'Exit'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Employees':
          viewEmployees(selectTask);
          break;

        case 'View All Employees by Manager':
          employeesByManager(selectTask);
          break;

        case 'Add New Employee':
          addEmployee(selectTask);
          break;

        case 'Remove Employee':
          removeEmployee(selectTask);
          break;

        case 'Update Employee':
          updateEmpolyee(selectTask);
          break;

        case 'View All Roles':
          viewRoles(selectTask);
          break;

        case 'Add New Role':
          addRole(selectTask);
          break;

        case 'Remove Role':
          removeRole(selectTask);
          break;

        case 'View All Departments':
          viewDepartments(selectTask);
          break;

        case 'Add New Department':
          addDepartment(selectTask);
          break;

        case 'Remove Department':
          removeDepartment(selectTask);
          break;

        case 'View Total Utilized Budget of Department':
          departmentBudget(selectTask);
          break;

        case 'Exit':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};