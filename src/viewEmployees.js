const { connection } = require('../connection');

let viewEmployees = (selectTask) => {
    const query = `
    SELECT 
      e.id, 
      e.first_name, 
      e.last_name, 
      title, 
      d.name AS department,
      salary,
      m.first_name AS manager
  FROM employees e
  LEFT JOIN roles r 
      ON e.role_id = r.id
  LEFT JOIN employees m
      ON e.manager_id = m.id
  LEFT JOIN departments d
      ON r.id = d.id`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      selectTask();
    });
  };

  module.exports = { viewEmployees };