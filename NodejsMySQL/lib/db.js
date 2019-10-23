var myMysql = require('mysql');
var myConn = myMysql.createConnection({
    host: 'localhost',
    user : 'caro',
    password : 'dksd1702',
    database : 'nodejsdb'
});

myConn.connect();

module.exports = myConn;