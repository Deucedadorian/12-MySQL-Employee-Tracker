const { connection } = require("../connection");
const { getDepartments } = require('./getDepartments');
const inquirer = require('inquirer');

let removeDepartment = async (selectTask) => {
  const departments = await getDepartments();
  const answers = await inquirer.prompt([
    {
      name: "department",
      type: "list",
      message: "Which department would you like to delete?",
      choices: departments,
    },
  ]);
  console.log("made it this far");
  await connection.query(
    `
      DELETE FROM departments
      WHERE ?`,
    {
      id: Number(answers.department),
    },
    (err) => {
      if (err) throw err;
      selectTask();
    }
  );
};

module.exports = { removeDepartment };
