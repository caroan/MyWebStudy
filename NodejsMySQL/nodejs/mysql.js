var mysql = require('mysql');
var connection = mysql.createConnection({ //커넥션 생성, 인자로 객체를 전달
  host     : 'localhost', //호스트명
  user     : 'caro', //유저명
  password : 'dksd1702', //비번
  database : 'nodejsdb', //사용 데이터 베이스
});
/*<인증실패로 접속이 안되는 분들 참고하세요>
MySQL 8.0에서는 사용자 인증방법이 caching_sha2_password만 사용하게 되었기 때문에
강제로 mysql_native_password를 사용하게 바꿔주던지, caching_sha2_password를 지원하는 connector를 사용해야 합니다. 인증방법을 새버전에서 지원하지 않는 구버전의 인증방법으로 바꾸는 것은 보안상 좋지 않은 방법이라고 합니다. 그래도 공부하실때는 쉽게 접속이 가능하니 참고하시기 바랍니다. java쪽은 지원 커넥터들이 나왔있다고 하는데 검색해서 찾아보시면 될것 같네요 PHP는 아직 없는것 같아서 힘들었습니다만,,,, 그래도 인증방법을 바꾸는게 더 쉽죠. ㅋㅋㅋ
도움이 되셨길 바랍니다.

use mysql;로 먼저 유저 정보를 관리하는 데이터베이스로 넘어간다.

<1번방법 : root계정의 인증방법 강제로 바꿈>
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourRootPassword';

<2번방법 : 새로운 유저를 만들어 인증방법을 구버전을 적용하도록 함>
CREATE USER 'newUser'@'%' IDENTIFIED WITH mysql_native_password BY 'YourUserPassword';
GRANT ALL PRIVILEGES ON opentutorials.* TO 'newUser'@'%';
FLUSH PRIVILEGES;*/
 
connection.connect();
 
connection.query('SELECT * FROM Topic', function (error, results, fields) {
  if (error) {
      console.log(error);
  };
  console.log('The solution is: ', results);
}); //첫번째 인자로 SQL문을 주고, 두번째로 SQL이 데이터에 전송되어서 실행이 끝난 다음 콜백함수를 전달한다.
 
connection.end();