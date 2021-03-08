const util = require('util');
const mysql = require ("mysql");

const connection = mysql.createConnection({
    
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees'
});

connection.connect();


//connection.query uses promise instead of callbacks and we can use asynch/await syntax
connection.query = util.promisify(connection.query);


module.exports = connection;