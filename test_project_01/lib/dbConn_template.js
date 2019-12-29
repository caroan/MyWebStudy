const mysql = require('mysql');
const myConn = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

myConn.connect();

module.exports = myConn;