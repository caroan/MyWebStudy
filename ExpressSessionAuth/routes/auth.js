const express = require('express');
var router = express.Router();
var fs = require('fs');
var template = require('../lib/template.js');
var path = require('path');
var qs = require('querystring');

//원래는 아래처럼 코드에 있어서도 안되고 암호는 해쉬로 암호화 하도록 한다.
var authData = {
  email: 'caroan',
  password: '1111',
  nickname: 'myungsun'
}

router.get('/login', function(request, response){
  var title = 'Web - login';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
    <form action="/auth/login_process" method="post">
      <p><input type="text" name="email" placeholder="email"></p>
      <p><input type="password" name="password" placeholder="password"></p>
      <p><input type="submit" value="login"></p>
    </form>
  `, '');
  response.send(html);
});

router.post('/login_process', function(request, response){
  var body = '';
  request.on('data', function(data){
    body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var email = post.email;
      var password = post.password;
      if(email === authData.email && password === authData.password){
        request.session.is_logined = true;
        request.session.nickname = authData.nickname;
        //세션 스토어에 저장 중에 리다이렉션 되어버리면 문제가 발생할 수 있다.
        request.session.save(function(){
          response.redirect(`/`); 
        }); //세션 내용을 바로 적용하는 작업을 시작. 이 작업이 모두 끝나면 콜백 함수 호출
      }
      else{
        response.send('who?');
      }
  });
});

router.get('/logout', function(request, response){
  request.session.destroy(function(err){
    //세션 삭제 후 호출되도록 약속되어 있다.
    response.redirect('/');
  });
});

  module.exports = router;