const { connection } = require('../connection');
const inquirer = require('inquirer');

let addDepartment = (selectTask) => {
    inquirer
    .prompt({
      name: 'department',
      type: 'input',
      message: 'Enter the name of the new department:'
    })
    .then((answers) => {
      connection.query('INSERT INTO departments SET ?',
        {
          name: answers.department
        },
        (err) => {
          if (err) throw err;
          selectTask();
        }
      );
    });
  }

  module.exports = { addDepartment };