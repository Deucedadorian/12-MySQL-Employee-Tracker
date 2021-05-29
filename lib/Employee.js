const mysql = require('mysql');
const { SelectTask } = require("../employeeTracker")

const connection = mysql.createConnection({
    host: 'localhost',
  
    port: 3306,
    
    user: 'root',
    password: '12345',
    database: 'businessDB',
});

const viewEmployees = () => {
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
  JOIN roles r 
      ON e.role_id = r.id
  LEFT JOIN employees m
      ON e.manager_id = m.id
  JOIN departments d
      ON r.id = d.id
  ORDER BY e.id`;
    connection.query(query, (err, res) => {
      console.table(res);
      SelectTask();
    });
};

module.exports = { viewEmployees };