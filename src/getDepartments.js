const { connection } = require('../connection');
const util = require('util');
const queryAsync = util.promisify(connection.query).bind(connection);

let getDepartments = async () => {
    try {
      const rows = await queryAsync('SELECT * FROM departments');
      return rows.map((department) => ({name: department.name, value: department.id}));
    } catch (err) {
        console.log(`Err at getDepartments,`, err);
    }
  }

module.exports = { getDepartments };