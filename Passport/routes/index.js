var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');

router.get('/', function(request, response){
    console.log('/', request.user); //<- ㅍㅐ스포트가 유저 값을 리퀘스트에 넣어준다.

  var fmsg = request.flash();
  var feedback = '';
  if(fmsg.success){
    feedback = fmsg.success[0];
  }

    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list); //기존 filelist 대신 미들웨어에 적었던 리퀘스트 값이 들어간다.
    var html = template.HTML(title, list,
      `<div style="color:blue;">${feedback}</div>
      <h2>${title}</h2>${description}
      <img src="/images/example.jpg" style="width:100px; display:block; margin-top:10px;">`,
      `<a href="/topic/create">create</a>`
    , auth.getStatusUI(request, response));
    response.send(html);
  });

  module.exports = router;