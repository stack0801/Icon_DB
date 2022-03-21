const mysql = require('mysql');
var test = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '20172517',
    database: 'javateam'
}

var connection = mysql.createConnection(test);

module.exports = connection