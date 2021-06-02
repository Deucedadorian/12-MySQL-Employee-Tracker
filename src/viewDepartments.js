const { connection } = require('../connection');

let viewDepartments = (selectTask) => {
    connection.query(`SELECT name AS Departments FROM departments;`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      selectTask();
    });
  }

module.exports = { viewDepartments };