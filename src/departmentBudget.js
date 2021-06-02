const { connection } = require('../connection');
const inquirer = require('inquirer');
const { getDepartments } = require('./getDepartments');

let departmentBudget = async (selectTask) => {
    const departments = await getDepartments();
    const answers = await inquirer.prompt([
      {
        name: 'department',
        type: 'list',
        message: 'Enter the manager you\'d like to search by:',
        choices: departments,
      }
    ])
    await connection.query(`
    SELECT SUM(salary) as total_utilized_budget,
      d.name AS department
      FROM employees e
    LEFT JOIN roles r 
      ON e.role_id = r.id
    LEFT JOIN departments d
      ON r.id = d.id
      WHERE ?`,
      {
        department_id: Number(answers.department),
      },
      (err, res) => {
      if (err) throw err;
      console.table(res);
      selectTask();
    });
  };
  
  module.exports = { departmentBudget };