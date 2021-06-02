const { connection } = require('../connection');
const inquirer = require('inquirer');
const { getEmployees } = require('./getEmployees');

let removeEmployee = async (selectTask) => {
    const employees = await getEmployees();
    const answers = await inquirer.prompt([
      {
        name: 'employee',
        type: 'list',
        message: 'Which Employee would you like to delete?',
        choices: employees,
      }
    ])
    await connection.query(` 
    DELETE FROM employees
    WHERE ?`,
    {
      id: Number(answers.employee),
    },
    (err) => {
      if (err) throw err;
      selectTask();
    });
  }

  module.exports = { removeEmployee };