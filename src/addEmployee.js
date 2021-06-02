const { connection } = require('../connection');
const inquirer = require('inquirer');
const { getRoles } = require('./getRoles');
const { getManagers } = require('./getManagers');

let addEmployee = (selectTask) => {
    Promise.all([getRoles(), getManagers()])
    .then(([ roles, managers ]) =>
      inquirer
      .prompt([
        {
          name: 'firstName',
          type: 'input',
          message: 'Enter the employee\'s first name:',
        },
        {
          name: 'lastName',
          type: 'input',
          message: 'Enter the employee\'s last name:',
        },
        {
          name: 'role',
          type: 'list',
          message: 'Enter the employee\'s role:',
          choices: roles,
        },
        {
          type: 'list',
          name: 'managerCheck',
          message: 'Does the employee have a manager?',
          choices: ['yes', 'no'],
        },
        {
          name: 'manager',
          type: 'list',
          choices: managers,
          when: (answers) => answers.managerCheck === 'yes',
        },
      ])
    )
    .then((answers) => {
      if (answers.managerCheck === 'yes') {
        connection.query(
          'INSERT INTO employees SET ?',
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: Number(answers.role),
            manager_id: Number(answers.manager),
          },
          (err) => {
            if (err) throw err;
            selectTask();
          }
        );
      } else {
        connection.query(
          'INSERT INTO employees SET ?',
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: Number(answers.role),
          },
          (err) => {
            if (err) throw err;
            selectTask();
          }
        );
      }
    })
};

module.exports = { addEmployee };