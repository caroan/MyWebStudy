const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
const compression = require('compression');

app.use(compression() );

const session = require('express-session');
//const mySessionFile = require('session-file-store')(session);

const mysqlStore = require('express-mysql-session')(session);

const flash = require('connect-flash');

const myConn = require('./lib/dbConn.js');

app.use(session({
    secret: 'tempkey',
    resave: false,
    saveUninitialized: true,
    store: new mysqlStore({
        host: 'localhost',
        user: 'caro',
        port: 3306,
        password: 'dksd1702',
        database: 'nodejsdb'
    })
}));

app.use(flash());
// app.get('/flash', function(req, res){
//     req.flash('info', 'Incorrect');
//     res.redirect('/');
// });
// app.get('/flash-display', function(req, res){
//     res.render('index', {message: req.flash('info')});
// });

const passport = require('passport');
var localStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
    console.log('Serialize : ', user);
    done(null, user.username);
});
passport.deserializeUser(function(id, done){
    console.log('deserialize : ', id);
    myConn.query(`SELECT * FROM userInfo WHERE username = '${id}'`, function(err, result){
        if(err){
            console.log(err);
        }
        var userInfo = {
            username: result[0].username,
            password: result[0].userpasswd,
            userNick: result[0].userNick
        }
        done(null, userInfo); 
    });
});

passport.use(new localStrategy(
    {
        usernameField: 'id',
        passwordField: 'password'
    },
    function(username, password, done){
        myConn.query(`SELECT * FROM userInfo WHERE username = '${username}'`, function(err, result){
            if(err){
                console.log('error');
                return done(err);
            }
            console.log('length',result.length);
            if(result.length !== 0){
                console.log(result);
                //console.log(result[0].username);
                bcrypt.compare(password, result[0].userpasswd, function(errHash, resultHash){
                    if(errHash){
                        console.log(errHash);
                    }
                    if(resultHash){
                        //console.log(result[0].userpasswd);
                        //req.session.isLogin = true;
                        var userInfo = {
                            username: result[0].username,
                            password: result[0].userpasswd,
                            userNick: result[0].userNick
                        }
                        return done(null, userInfo, {message: 'Welcome'});//<- 일단 임시로 붙여두자.
                    }
                    else{
                        console.log('Incorrect password');
                        return done(null, false, {message: 'Incorrect password'});
                    }
                })
            }
            else{
                console.log('Incorrect username');
                return done(null, false, {message: 'Incorrect username'});
            }
        });
    }
));

app.post('/login_process', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true
}));

const bcrypt = require('bcrypt');
//const salt = 10;
// const myPass = '1111';
// const otherPass = '1112';

// bcrypt.hash(myPass, salt, function(err, hash){
//     bcrypt.compare(myPass, hash, function(err, result){
//         console.log(result);
//     });
// })

app.get('/', function(req, res){

    console.log("/ -> ", req.user);

    var fmsg = req.flash();
    if(fmsg.success){
        console.log('flash: ', fmsg.success[0]);
    }

    var page = '';
    if(req.user){
        page = 'data/tempPageLogin.html';
    }else{
        page = 'data/tempPage.html';
    }
    fs.readFile(page, 'utf-8', function(err, desc){
        if(err){
            console.log(err);
        }
        //파일 읽고 이를 바깥에서 쓴다는 것은 생각하지 않는 것이 좋다. 비동기식이라 순서가 어떻게 될지 모르기 때문이다.
        res.send(desc);
    });
});

app.get('/login/:tempID', function(req, res){
    res.send(req.params);
});

app.get('/login', function(req, res){
    var fmsg = req.flash();
    if(fmsg.error){
        console.log('flash: ',fmsg.error[0]);
    }
    fs.readFile(`data/loginPage.html`, 'utf-8', function(err, desc){
        if(err){
            console.log(err);
        }
        res.send(desc);
    });
});

app.get('/logout', function(req, res){
    req.logout();

    req.session.destroy(function(err){
        fs.readFile('data/tempPage.html', 'utf-8', function(err, desc){
            if(err){
                console.log(err);
            }
            //파일 읽고 이를 바깥에서 쓴다는 것은 생각하지 않는 것이 좋다. 비동기식이라 순서가 어떻게 될지 모르기 때문이다.
            res.redirect('/');
        });
    });
});

app.get('/register', function(req, res){
    var html = `
    <form action="register_process" method="post">
        <p><input type="text" name="id"></p>
        <p><input type="password" name="password"></p>
        <p><input type="text" name="nickname"></p>
        <p><input type="submit" value="등록"></p>
    </form>
    `;
    res.send(html);
});

app.post('/register_process', function(req, res){
    var post = req.body;
    var id = post.id;
    var password = post.password;
    var nick = post.nickname;
    bcrypt.hash(password, 10, function(hashErr, hash){
        if(hashErr){
            console.log(hashErr);
        }
        myConn.query(`SELECT username FROM userInfo WHERE username = '${id}'`, function(error, result){
            if(error){
                console.log(error);
            }
            if(result.length > 0){
                req.flash('errorMessage', 'Same ID is Here');
                var fmsg = req.flash();
                console.log(fmsg);
                if(fmsg.error){
                    console.log("ERROR MESSAGE SAME ID : ",fmsg.errorMessage[0]);
                }
                res.redirect('/');
            }
            else{
                myConn.query(`INSERT INTO userInfo VALUES ('${id}', '${hash}', '${nick}')`, function(err, result){
                    if(err){
                        console.log(err);
                    }
                    console.log(result);
                    var user = {
                        username: id,
                        password: hash,
                        nick: nick
                    }
                    req.login(user, function(err){
                        if(err){
                            console.log(err);
                        }
                        res.redirect('/');
                    });
                });
            }
        }); 
    });
});

/*
app.post('/login_process', function(req, res){
    var body = req.body;
    myConn.query(`SELECT * FROM userInfo WHERE username = '${body.id}'`, function(err, result){
        if(err){
            console.log(err);
        }
        if(result){
            console.log(result);
            console.log(result[0].username);
            req.session.isLogin = true;
        }
        else{
            console.log('Not here');
        }
        res.send(result[0].username);
    });
});
*/

app.get('/register', function(req, res){
    
    myConn.query(`INSERT INTO userInfo (username, userpasswd, userNick) VALUES (${req})`);
    
});

app.use(function(req, res, next){
    res.status(404).send('No where');
});

app.use(function(error, req, res, next){
    console.log(error.stack);
    res.status(500).send('Something wrong');
});

app.listen(3000, function(){
    console.log('listen OK');
})