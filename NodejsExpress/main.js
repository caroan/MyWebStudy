const express = require('express');
const app = express();
var fs = require('fs');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');


app.use(express.static('public')); //퍼블릭 폴더에서 스태틱 파일을 찾겠다는 뜻.

//Express third-party middleware 'body-parser' 불러오기
//var bodyParser = require('body-parser');
//var compression = require('compression');

//app.use(bodyParser.urlencoded({extended: false})); //미들웨어가 실행된다.
//json을 요청하는 경우 app.use(bodyParser.json()); 을 사용한다.


//app.use(compression());


//내가 만드는 미들웨어.
// app.use(function(request, response, next){ //이 다음에 호출될 미들웨어가 next로 들어온다.
//   fs.readdir('./data', function(error, filelist){
//     request.list = filelist; // 이후 들어올 모든 request에는 파일 리스트가 들어가게 된다.
//     next(); //<- 그다음에 호출되어야 할 미들웨어를 실행한다.
//   });
// });
//위처럼 하면 모든 리퀘스트에 해당 값이 들어가기 때문에 안써도 되는 곳에 써야 하는 비효율일 발생한다. 이를 방지하기 위해 아래롸 같이 사용한다.
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});//'*'는 모든 요청을 의미한다. get 이기 때문에 겟 방식에만 사용하게 된다.

app.use('/', indexRouter);
app.use('/topic', topicRouter); // /topic 으로 시작하는 애들에게 topicRouter를 적용하겠다는 뜻.



//라우팅 해주는 코드
//app.get('/', (req, res) => res.send('hello world'));
//위 내용은 아래와 같다.
// app.get('/', function(req, res){
//   return res.send('hello world');
// });

app.get('/page/:pageID', function(request, response, next){
  //클린 URL 방식. return response.send(request.params); //?id=xx 로 값을 줘도 되는데 요즘 시멘틱웹이라고 해서 저렇게 주는 것은 안좋게 봐서 이렇게 주도록 하는 것이 유행이다.
  fs.readdir('./data', function(error, filelist){  
    var filteredId = path.parse(request.params.pageID).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      if(err){
        next(err);
        return;
      }
      var title = request.params.pageID;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags:['h1']
      });
      var list = template.list(filelist);
      var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/topic/create">create</a>
          <a href="/topic/update/${sanitizedTitle}">update</a>
          <form action="/topic/delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>`
      );
      response.send(html);
    });
  });
});

//에러 처리
app.use(function(request, response, next){
  response.status(404).send('Sorry. Can\'t Not Find');
});

//next를 통해 전달 받은 err를 받음. 에러 핸들을 위한 미들 웨어 형태.
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.status(500).send('something broke!!');
});

//
app.listen(3000, () => console.log('example app listening on port 3000!'));
// app.listen(3000, function(){
//   console.log('example app listening on port 3000!');
// });