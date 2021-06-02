const { connection } = require('../connection');
const { getEmployees } = require('./getEmployees');
const { getRoles } = require('./getRoles');
const { getManagers } = require('./getManagers');
const inquirer = require('inquirer');

let updateEmpolyee = (selectTask) => {
  Promise.all([getEmployees(), getRoles(), getManagers()])
    .then(([employees, roles, managers]) =>
      inquirer.prompt([
        {
          name: "employee",
          type: "list",
          message: "Choose the employee to update:",
          choices: employees,
        },
        {
          name: "role",
          type: "list",
          messages: "Choose the employee's role:",
          choices: roles,
        },
        {
          name: "managerCheck",
          type: "list",
          message: "Does the employee now have a manager?",
          choices: ["yes", "no"],
        },
        {
          name: "manager",
          type: "list",
          choices: managers,
          message: "Who is the employee's manager?",
          when: (answers) => answers.managerCheck === "yes",
        },
      ])
    )
    .then((answers) => {
      if (answers.managerCheck === "yes") {
        connection.query(
          "UPDATE employees SET ? WHERE ?",
          [
            {
              role_id: answers.role,
              manager_id: Number(answers.manager),
            },
            {
              id: Number(answers.employee),
            },
          ],
          (err) => {
            if (err) throw err;
            selectTask();
          }
        );
      } else {
        connection.query(
          "UPDATE employees SET ? WHERE ?",
          [
            {
              role_id: answers.role,
              manager_id: null,
            },
            {
              id: Number(answers.employee),
            },
          ],
          (err) => {
            if (err) throw err;
            selectTask();
          }
        );
      }
    });
};

module.exports = { updateEmpolyee };
