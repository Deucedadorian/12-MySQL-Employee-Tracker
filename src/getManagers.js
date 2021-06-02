const { connection } = require('../connection');
const util = require('util');
const queryAsync = util.promisify(connection.query).bind(connection);

let getManagers = async () => {
    try {
      const rows = await queryAsync('SELECT first_name, last_name, id FROM employees WHERE manager_id IS NULL');
      return rows.map((manager) => ({name: `${manager.first_name} ${manager.last_name}`, value: manager.id}));
    } catch (err) {
        console.log(`Err at getRoles,`, err);
    }
  };

  module.exports = { getManagers };