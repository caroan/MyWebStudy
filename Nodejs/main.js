var http = require('http');
var fs = require('fs');
var url = require('url');

function tampleteHTML(title, list, description){

  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <h2>${title}</h2>
    <p>${description}
    </p>
  </body>
  </html>
  `;
}

function templeteList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i<filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i++;
  }
  list = list + '</ul>';

  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;//객체로 반환한다.
    var pathname = url.parse(_url, true).pathname;//id 이전단계까지 알려준다.
    var title = queryData.id;

    if(pathname === '/'){
      fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
        if(queryData.id === undefined){
          title = 'wecolme';
          description = 'Hello Node.js';
        }
        fs.readdir('./data', function(err, filelist){
          templete = tampleteHTML(title, templeteList(filelist), description); //자바스크립트에서 전역변수를 콜백 함수에서 변경해서 다른 곳에 적용시킬 수 없다.(비동기 문제로 인해 할 수가 없음.) 유일한 방법은 그냥 콜백 함수에 해당 내용을 모두 넣어버리는 수 밖에 없다.
        
          response.writeHead(200); //200 : 파일을 잘 전송했다.
          response.end(templete);
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