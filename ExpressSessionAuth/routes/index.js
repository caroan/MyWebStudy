var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');

router.get('/', function(request, response){
    
    //fs.readdir('./data', function(error, filelist){
      var title = 'Welcome';
      var description = 'Hello, Node.js';
      console.log('request List : ' + request.list);
      var list = template.list(request.list); //기존 filelist 대신 미들웨어에 적었던 리퀘스트 값이 들어간다.
      var html = template.HTML(title, list,
        `<h2>${title}</h2>${description}
        <img src="/images/example.jpg" style="width:100px; display:block; margin-top:10px;">`,
        `<a href="/topic/create">create</a>`
      , auth.getStatusUI(request, response));
      response.send(html);
    //});
  
  //위에서 미들 웨어로 파일이름을 리퀘스트에 넣었기 때문에 위와 같이 코딩해도 된다.
  
    // fs.readdir('./data', function(error, filelist){
    //   var title = 'Welcome';
    //   var description = 'Hello, Node.js';
    //   var list = template.list(filelist);
    //   var html = template.HTML(title, list,
    //     `<h2>${title}</h2>${description}`,
    //     `<a href="/create">create</a>`
    //   );
    //   response.send(html);
    // });
  });

  module.exports = router;