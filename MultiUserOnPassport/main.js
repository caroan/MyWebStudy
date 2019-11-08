const express = require('express');
const app = express();
var fs = require('fs');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var session = require('express-session')
var FileStore = require('session-file-store')(session); //파일 스토어를 mysql로 바꿔서 사용할 수 있다.
var auth = require('./lib/auth');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

app.use(express.static('public')); //퍼블릭 폴더에서 스태틱 파일을 찾겠다는 뜻.

app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});//'*'는 모든 요청을 의미한다. get 이기 때문에 겟 방식에만 사용하게 된다.
app.use(bodyParser.urlencoded({extended: false})); //미들웨어가 실행된다.

app.use(session({
  HttpOnly: true, //자바 스크립트를 통해 세션 쿠키를 못 사용하도록 막을 수 있다. 
  secure: true, //https에서 통신하도록 한다.
  secret: 'NoHere',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));


//flash는 일회용 메모리이다.
app.use(flash());

app.get('/flash', function(request, response){
  request.flash('info', 'Flash is back!!');
  // request.redirect('/');
  response.send('flash');
});

app.get('/flash-display', function(request, response){
  var fmsg = request.flash();
  console.log(fmsg);
  response.render('index', {message: req.flash('info')});
});

//세션 다음에 패스 포트가 등장해야 한다.(패스포트는 세션을 내부적으로 사용하기 때문.)
//또한 패스포트는 바디파서를 사용해야 한다.

var passport = require('./lib/passport')(app);

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth')(passport);

app.use('/', indexRouter);
app.use('/topic', topicRouter); // /topic 으로 시작하는 애들에게 topicRouter를 적용하겠다는 뜻.
app.use('/auth', authRouter);

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
          </form>`,auth.getStatusUI(request, response)
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