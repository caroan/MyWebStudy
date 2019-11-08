var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var fileStore = require('session-file-store')(session); //파일 스토어를 mysql로 바꿔서 사용할 수 있다.

var app = express()

app.use(session({
  secret: 'myungsunsunAn1985'/*'keyboard cat'*/, //반드시 필요한 옵션. 소스 코드에 포함 시키지 않아야 한다.
  resave: false, //false : 세션 데이터 저장소가 바뀌기 전까지 세션 저장소의 값을 바꾸지 않는다.
  saveUninitialized: true, // true : 세션이 필요하기 전까지는 세션을 구동시키지 않는다. false : 무조건 구동(서버 부담)
  store: new fileStore() //파일 스토어 사용시 적용, 코드가 시작하면 파일 하나 만들어서 저장한다.
}))

/*
app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

  next()
})

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})
*/

app.get('/'/*bar'*/, function (req, res, next) {
  //res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
  console.log(req.session);
  if(req.session.num === undefined){
    req.session.num = 1;
  }
  else{
    req.session.num += 1;
  } //<- req.session.num 여기 세션값은 메모리에 저장되고, 노드를 껐다가 켜면 처음부터 다시 시작하게 된다.
  //메모리에 세션 데이터를 저장하면 휘발성 메모리라 서버가 바뀌거나 꺼지면 문제가 생긴다. 이를 방지 하기 위해 세션 스토어를 다변화 해야 한다.
  res.send(`Views : ${req.session.num}`);
})

app.listen(3000, function(){
    console.log('Example app listening on port 3000!!');
});