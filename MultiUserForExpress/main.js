//npm install -s express로 설치
const express = require('express');
const app = express();

const db = require('./lib/db');

//npm으로 바디 파서 설치.
//바디 파서를 설치 하지 않으면 패스포트의 passport.use(new LocalStrategy 에서 콜백함수가 불려지지 않는다.
//아래처럼 앱에 적용해야 모두 적용된다.
//문제는 바디 파서를 쓰면 기본적인 post를 쓸수 없다는 문제가 생긴다.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//npm connect-flash. 세션의 플래시 메모리를 관리하는 녀석
const flash = require('connect-flash');

//파일 시스템
const fs = require('fs');

//경로
const path = require('path');

//피싱 코드 방어
const sanitizeHtml = require('sanitize-html');

//routes 폴더
const indexRouter = require('./routes/index');
const topicRouter = require('./routes/topic');
//const authRouter = require('./routes/auth');

//lib 폴더
const template = require('./lib/template');
const auth = require('./lib/auth');

//npm install -s express-session 설치, 세션을 사용할 수 있게 해준다.
const session = require('express-session');

//npm install -s session-file-store 으로 설치. 파일 스토어를 mysql로 수정할 수 있다. 플래쉬 세션 저장소를 사용하게 해준다.
const FileStore = require('session-file-store')(session);

//스테틱 파일을 찾아 사용한다.(정적인 파일은 이렇게 추가해서 쓴다고 한다.)
app.use(express.static('public'));

app.get('*', function(request, response, next){
    request.list = db.get('topics').value();
    next();
    // fs.readdir('./data', function(error, filelist){
    //     request.list = filelist;
    //     next();
    // });
});

app.use(session({
    HttpOnly: true,
    secure: false,
    secret: 'NoHere',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

//세션 다음에 사용하도록. connect-flash에서 사용.
app.use(flash());

//아래 두 함수는 단순히 플래시라는 게 뭔지 알려주는 설명용 함수로 신경쓰지 않아도 된다.

app.get('/flash', function(req, res){
    //자체에서 req에 flash를 넣고 아래에서 인포에 2번째 인자를 메시지 값으로 넣는다.
    req.flash('info', 'flash is back!!');//이러면 세션 스토어에 flash의 'info'에 'flash is back!!'이 저장된다.
    response.send('flash');
});

//위의 함수를 거쳐서 세션 스토어에 값이 저장되고 아래 함수를 가면 세션 스토어에 있는 플래시 메모리가 삭제되고 fmg에 플래시 메모리에 있던 값이 출력된다.
//플래시 메모리는 1회용으로 사용하면 바로 지워진다.
app.get('flash-display', function(req, res){
    var fmsg = req.flash();
    res.render('index', {message: req.flash('info')});
});

//세션 다음에 패스 포트가 있어야 한다. (패스포트는 세션을 내부적으로 사용하기 때문에.)
//또한 패스포트는 바디 파서를 사용해야 한다.
const passport = require('./lib/passport')(app);
const authRouter = require('./routes/auth')(passport);

app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

//이건 그냥 이렇게 쓰는 것 같다. 아무것도 안했는데 이렇게 되는 걸 보면...
app.use('/page/:pageID', function(req, res, next){
    var topic = db.get('topics').find({id:req.params.pageID}).value();
    var user = db.get('users').find({id:topic.user_id}).value();
    var sanitizeTitle = sanitizeHtml(topic.title);
    var sanitizeDesc = sanitizeHtml(topic.desc, {allowedTags:[`h1`]});
    var list = template.LIST(req.list);
    var html = template.HTML(sanitizeTitle, list, 
        `<h2>${sanitizeTitle}</h2>${sanitizeDesc} <p>by ${user.nickname}</p>`,
        `<a href="/topic/create">create</a>
        <a href="/topic/update/${topic.id}">update</a>
        <form action="/topic/delete_process" method="post">
            <input type="hidden" name="id" value="${topic.id}">
            <input type="submit" value="delete">
        </form>`,auth.getStatusUI(req, res));
    res.send(html);


    // fs.readdir('./data', function(error, filelist){
    //     var fileteredID = path.parse(req.params.pageID).base;
    //     fs.readFile(`data/${fileteredID}`, `utf8`, function(err, description){
    //         if(err){
    //             next(err); //밑에 있는 에러 처리 미들웨어에 넘겨버린다.
    //             return ;
    //         }
    //         var title = req.params.pageID;
    //         var sanitizeTitle = sanitizeHtml(title);
    //         var sanitizeDesc = sanitizeHtml(description, {allowedTags:[`h1`]});
    //         var list = template.LIST(filelist);
    //         var html = template.HTML(sanitizeTitle, list, 
    //             `<h2>${sanitizeTitle}</h2>${sanitizeDesc}`,
    //             `<a href="/topic/create">create</a>
    //             <a href="/topic/update/${sanitizeTitle}">update</a>
    //             <form action="/topic/delete_process" method="post">
    //                 <input type="hidden" name="id" value="${sanitizeTitle}">
    //                 <input type="submit" value="delete">
    //             </form>`,auth.getStatusUI(req, res));
    //         res.send(html);
    //     });
    // });
});


//에러처리
app.use(function(req, res, next){
    res.status(404).send('I can\'t find your path.');
});

//next를 통해 전달 받은 err를 처리하는 함수. 에러를 핸들링 하는 미들 웨어 형태
app.use(function(error, req, res, next){
    console.log(error.stack);
    res.status(500).send('Something wrong');
});

app.listen(3000, ()=> console.log('Listen Ok!!!'));