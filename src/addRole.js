const { connection } = require('../connection');
const { getDepartments } = require('./getDepartments');
const inquirer = require('inquirer');

let addRole = async (selectTask) => {
  const departments = await getDepartments();
  const answers = await inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "Enter the name of the new role:",
    },
    {
      name: "salary",
      type: "number",
      message: "Enter the salary of the new role:",
    },
    {
      name: "departmentId",
      type: "list",
      message: "Enter the department id of the new role:",
      choices: departments,
    },
  ]);
  await connection.query(
    "INSERT INTO roles SET ?",
    {
      title: answers.title,
      salary: answers.salary,
      department_id: Number(answers.departmentId),
    },
    (err) => {
      if (err) throw err;
      selectTask();
    }
  );
};

module.exports = { addRole };
