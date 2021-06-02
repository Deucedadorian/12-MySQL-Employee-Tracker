const { connection } = require('../connection');

let viewRoles = (selectTask) => {
    connection.query('SELECT title AS Roles FROM roles;',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      selectTask();
    });
  } 
  
module.exports = { viewRoles };