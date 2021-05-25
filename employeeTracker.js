const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const mysql = require('mysql');
const inquirer = require('inquirer');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '12345',
  database: '',
});

