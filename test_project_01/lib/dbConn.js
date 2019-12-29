const mysql = require('mysql');
const myConn = mysql.createConnection({
    host: 'localhost',
    user: 'caro',
    password: 'dksd1702',
    database: 'nodejsdb'
});

myConn.connect();

module.exports = myConn;