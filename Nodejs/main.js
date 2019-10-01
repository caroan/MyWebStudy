var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var templeteObject = require('./lib/templete.js');
var path = require('path');//유저가 입력한 경로 정보를 파싱해주는 모듈
var sanitizeHTML = require('sanitize-html');

var app = http.createServer(function(request,response){ //Node.js가 웹브라우저에게 요청을 받을 때마다 호출되는 함수. request: 웹브라우저로부터 받은 요청, response : 웹브라우저에게 서버가 보내는 응답
    var _url = request.url;
    var queryData = url.parse(_url, true).query;//객체로 반환한다.
    var pathname = url.parse(_url, true).pathname;//id 이전단계까지 알려준다.
    var title = queryData.id;
    var control = '<a href="/create">create</a>';

    var sanitizedTitle = sanitizeHTML(title);
    var sanitizedDesc = '';
    var filteredPath ='';

    if(pathname === '/'){

      if(queryData.id === undefined){
        filteredPath = ''
      }else{
        filteredPath = path.parse(queryData.id).base; //Path 모듈로 입력되는 정보를 모두 파싱해서 수정.(이게 안되면 localhost:3000/?id=../password.js 로 입력하면 해당 파일의 내용이 표시되는 문제가 생긴다.)
      }
      
      fs.readFile(`data/${filteredPath}`, 'utf8', function(err, description){
        if(queryData.id === undefined){
          sanitizedTitle = 'wecolme';
          sanitizedDesc = 'Hello Node.js';
        }
        else{
          control = `<a href="/create">create</a>
          <a href="/update?id=${sanitizedTitle}">update</a>
          <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>`;
        }
        
        fs.readdir('./data', function(err, filelist){
          sanitizedDesc = sanitizeHTML(description, {allowedTags:['h1', 'h2']}); //XSS에서 일부 태그는 예외로 둘 수 있다.
          templete = templeteObject.html(sanitizedTitle, templeteObject.list(filelist), sanitizedDesc, control);
          //자바스크립트에서 전역변수를 콜백 함수에서 변경해서 다른 곳에 적용시킬 수 없다.(비동기 문제로 인해 할 수가 없음.) 유일한 방법은 그냥 콜백 함수에 해당 내용을 모두 넣어버리는 수 밖에 없다.
        
          response.writeHead(200); //200 : 파일을 잘 전송했다.
          response.end(templete);
        });
      });
    }
    else if(pathname==="/create"){
      fs.readdir(`data`, function(err, filelist){
        fs.readFile(`data/`, 'utf8', function(){
          if(queryData.id === undefined){
            title = 'Web - create';
            description = `
            <form action="http://localhost:3000/create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p><textarea name="description" placeholder="description"></textarea></p>
              <p><input type="submit"></p>
            </form>
            `;
            templete = templeteObject.html(title, templeteObject.list(filelist), description, '');
            response.writeHead(200);
            response.end(templete);
          }
        });
      });
    }
    else if(pathname === "/create_process"){
      var body = '';
      request.on('data', function(data){// 노드에서 전송되는 포스트 정보가 많을 경우를 대비해서 서버에서 수신할 때마다 이 콜백함수를 호출한다. 그리고 수신한 정보를 돌려주기로 함.
        body = body+data;
        if(body.length > 1e6){ //데이터가 너무 크면 꺼버린다.(1e6 = 1 * pow(10,6) === 대충 1mb)
          request.connection.destroy();
        }
      });
      request.on('end', function(){//더이상 들어오는 정보가 없으면(정보 수신이 끝나면) 호출됨
        var post = qs.parse(body); //완성된 데이터를 파싱하여 하나의 변수에 입력
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){//쓰기를 한 뒤 호출되는 함수.
          response.writeHead(302, {Location:`/?id=${title}`}); //302 : 페이지를 다른 곳으로 이동시킨다
          response.end();

        });
      });
    }
    else if(pathname === '/update'){
      fs.readdir('data', function(err, filelist){
        var filteredPath = path.parse(queryData.id);
        fs.readFile(`data/${filteredPath}`, 'utf8', function(err, desc){
          var title = queryData.id;
          var list = templeteObject.list(filelist);
          var sanitizedTitle = sanitizeHTML(title);
          var sanitizedDesc = sanitizeHTML(desc);
          var description = `
            <form action="/update_process" method="post">
              <p><input type="hidden" name="id" value="${sanitizedTitle}"></p>
              <p><input type="text" name="title" value="${sanitizedTitle}"></p>
              <p><textarea name="description" placeholder="description">${sanitizedDesc}</textarea></p>
              <p><input type="submit"></p>
            </form>
            `;
          var templete = templeteObject.html(title, list, description, control);
          response.writeHead(200);
          response.end(templete);
        });
      });
    }
    else if(pathname === '/update_process'){
      var body = "";
      request.on('data', function(data){
        body += data;
      });

      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var id = post.id;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(err){ //파일 이름 수정
          fs.writeFile(`data/${title}`, description, 'utf8', function(){
            response.writeHead(302, {Location:`/?id=${title}`});
            response.end();
          });
        });
      });
    }
    else if(pathname === "/delete_process"){
      var body ='';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        fs.unlink(`data/${id}`, function(err){ //파일 삭제
          response.writeHead(302, {Location:"/"});
          response.end();
        });
        
      });
    }
    else{
        response.writeHead(404);//404 : 파일전송에 문제가 생겼다.
        response.end('Not found');
        return;
    }
});
app.listen(3000);