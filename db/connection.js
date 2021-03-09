const util = require('util');
const mysql = require ("mysql");
const pass = require ('./pass.js');

const connection = mysql.createConnection({
    host: "localhost",
    // Your username
    user: "",
    // Your password
    password: "",
    database: "employees"
  });

connection.connect();


//connection.query uses promise instead of callbacks and we can use asynch/await syntax
connection.query = util.promisify(connection.query);


module.exports = connection;