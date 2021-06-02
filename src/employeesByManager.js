const { connection } = require('../connection');
const inquirer = require('inquirer');
const { getManagers } = require('./getManagers');

let employeesByManager = async (selectTask) => {
    const managers = await getManagers();
    const answers = await inquirer.prompt([
      {
        name: 'manager',
        type: 'list',
        message: 'Enter the manager you\'d like to search by:',
        choices: managers,
      }
    ])
    await connection.query(` 
    SELECT 
      e.id, 
      e.first_name, 
      e.last_name, 
      title, 
      d.name AS department,
      salary
    FROM employees e
    LEFT JOIN roles r 
      ON e.role_id = r.id
    LEFT JOIN departments d
      ON r.id = d.id
    WHERE ?`,
    {
      manager_id: answers.manager,
    },
    (err, res) => {
      if (err) throw err;
      console.table(res);
      selectTask();
    });
  }

module.exports = { employeesByManager };