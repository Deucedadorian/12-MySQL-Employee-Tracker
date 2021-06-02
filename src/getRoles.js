const util = require('util');
const { connection } = require('../connection');
const queryAsync = util.promisify(connection.query).bind(connection);

let getRoles = async () => {
  try {
    const rows = await queryAsync("SELECT * FROM roles");
    return rows.map((role) => ({ name: role.title, value: role.id }));
  } catch (err) {
    console.log(`Err at getRoles,`, err);
  }
};

module.exports = { getRoles };