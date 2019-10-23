//버전 관리 시 패스워드 등을 저장하는 것은 문제가 생길  수 있으므로 이렇게 템플릿 파일을 만들어 유저 비번 등을 빈칸으로 만들어 버전관리 시키고 실제 사용 시에만 해당 템플릿에 비번등을 넣어 사용하도록 한다.
var myMysql = require('mysql');
var myConn = myMysql.createConnection({
    host: '',
    user : '',
    password : '',
    database : ''
});

myConn.connect();

module.exports = myConn;