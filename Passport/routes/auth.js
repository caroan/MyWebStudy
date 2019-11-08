const express = require('express');
var router = express.Router();
var fs = require('fs');
var template = require('../lib/template.js');
var path = require('path');
var qs = require('querystring');

module.exports = function(passport){
  router.get('/login', function(request, response){
    var fmsg = request.flash();
    var feedback = '';
    if(fmsg.error){
      feedback = fmsg.error[0];
    }
    var title = 'Web - login';
    var list = template.list(request.list);
    //패스포트를 이용하기 위해서는 패스포트에서 요구하는 형식대로 유저 이름은 username, 비밀번호는 password로 아이디를 써야 한다.
    //만약 위 형식을 따르기 싫다면 파라미터로 해당 이름을 바꾸도록 한다.
    var html = template.HTML(title, list, `
      <div style="color:red;">${feedback}</div>
      <form action="/auth/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="password" placeholder="password"></p>
        <p><input type="submit" value="Log In"></p>
      </form>
    `, '');
    response.send(html);
  });
  
  router.post('/login_process', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/auth/login', failureFlash: true, successFlash: true}));
  
  router.get('/logout', function(request, response){
    request.logout();
    // request.session.destroy(function(err){ //세션을 이렇게 지워주는 것이 좋다. 그러나 이렇게 하면 에러 메시지가 뜨기 때문에 아래처럼 해줘도 좋다.
    //   response.redirect('/');
    // });
    request.session.save(function(){//현재 세션을 상태를 세션 스토어에 저장하고 리다이렉트를 한다.
      response.redirect('/');
    });
  });

  return router;
}