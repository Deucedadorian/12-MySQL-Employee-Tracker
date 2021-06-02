const { connection } = require('../connection');
const util = require('util');
const queryAsync = util.promisify(connection.query).bind(connection);

let getEmployees = async () => {
    try {
      const rows = await queryAsync('SELECT * FROM employees');
      return rows.map((employee) => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id}));
    } catch (err) {
      console.log('Err at getEmployees');
    }
  }

  module.exports = { getEmployees };