const { connection } = require('../connection');
const { getRoles } = require('./getRoles');
const inquirer = require('inquirer');

let removeRole = async (selectTask) => {
    const roles = await getRoles();
    const answers = await inquirer.prompt([
      {
        name: 'role',
        type: 'list',
        message: 'Which role would you like to delete?',
        choices: roles,
      }
    ])
    await connection.query(` 
    DELETE FROM roles
    WHERE ?`,
    {
      id: Number(answers.role),
    },
    (err) => {
      if (err) throw err;
      selectTask();
    });
  }

module.exports = { removeRole };