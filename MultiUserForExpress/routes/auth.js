const express = require('express');
const router = express.Router();
const template = require('../lib/template');
const qs = require('querystring');
const passport = require('passport');

//npm bcrypt 패스워드 암호화 라이브러리 호출
const bcrypt = require('bcrypt');

//npm shortid. 디비의 식별자를 만들어주는 랜덤 아이디 생성기.
const shortid = require('shortid');

var db = require('../lib/db');

// var authData = {
//     email : 'caroan',
//     password : '1111',
//     nickname : 'myungsun'
// }

module.exports = function(passport){

    //패스포트를 사용할 때 로그인 이름과 비번은 뒤에 패스포트의 LocalStrategy에서 다시 쓰이게 된다.
    router.get('/login', function(req, res){
        var fmsg = req.flash();
        var feedback = '';
        if(fmsg.error){
            feedback = fmsg.error[0];
        }        

        var title = 'Web - login';
        var list = template.LIST(req.list);
        var html = template.HTML(title, list, `
            <div>${feedback}</div>
            <form action="/auth/login_process" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="password" name="password" placeholder="password"></p>
            <p><input type="submit" value="login"></p>
            </form>
        `, '');
        res.send(html);
    });
    //여기서 로그인 하면 일단 LocalStrategy로 가고 그런 다음 성공 실패에 따라 passport.authenticate로 넘어가게 된다.

    //local : 사이트에서 직접 유저 이름과 패스워드로 들어가는 것을 의미함. 페북이나 구글로 들어가는 것은 다른 전략을 사용해야 한다.
    router.post('/login_process', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        //플래시 메모리를 활용하기 위헤 아래 두 설정을 true로 한다.
        //아래를 true로 하면 세션에 플래시 데이터가 저장된다.
        failureFlash: true,
        successFlash: true
    }));

    // deserializeUser이 호출 되지 않는 문제를 어떻게 해야 하는지 고민할 것.
    // router.post('/login_process', function(req, res, next){
    //     passport.authenticate('local', function(err, user, info){
    //         if(err){
    //             return next(err);
    //         }
    //         if(!user){
    //             req.flash('error', info.message);
    //             return req.session.save(function(errs){
    //                 if(errs){
    //                     return next(errs);
    //                 }
    //                 return res.redirect('/auth/login');
    //             });
    //         }
    //         req.login(user, function(err2){
    //             if(err2){
    //                 return next(err2);
    //             }
    //             req.flash('success', info.message);
    //             return req.session.save(function(err3){
    //                 if(err3){
    //                     return next(err3);
    //                 }
    //                 return res.redirect('/');
    //             });
    //         });
    //     })(req, res, next);
    // });

    // router.post('/login_process', function(req, res){
    //     var body = '';
    //     req.on('data', function(data){
    //         body += data;
    //     });

    //     req.on('end',function(){
    //         var post = qs.parse(body);
    //         var email = post.email;
    //         var password = post.password;

    //         if(email === authData.email && password === authData.password){
    //             req.session.is_logined = true;
    //             req.session.nickname = authData.nickname;

    //             //세션 스토어에 저장 중 리다이렉션이 되어버리면 문제가 발생할 수 있으므로 세션 내용을 바로 적용하도록 한다.
    //             req.session.save(function(){
    //                 res.redirect('/');
    //             });
    //         }
    //         else{
    //             res.send('I don\'t know who you are.');
    //         }
    //     });
    // });

    router.get('/logout', function(req, res){
        // req.session.destroy(function(error){
        //     if(error){
        //         console.log(error);
        //         res.redirect('/');
        //     }
        //     res.redirect('/');
        // });

        req.logout(); //설명에는 로그아웃 후 바로 리다이렉트를 하라고 되어 있지만 사실 세션을 지우고 리다이렉트 하는 것이 더 안정적이고 좋다.
        // req.session.destroy(function(error){ //다만 이렇게 하면 destroy를 했을 때 세션 파일이 지워지는데, 리다이렉트로 홈에 돌아오면 다시 돌아오면서 다시 요청을 보내면서, request.header에 지워진 파일 이름에 해당하는 세션을 쿠키값으로 여전히 가지고 있어서 다시 이걸 찾으려니 파일을 찾을 수 없다고 나오게 된다.
        //     if(error){
        //         console.log(error);
        //         res.redirect('/');
        //     }
        //     res.redirect('/');
        //     // res.writeHead(302, {Location: `/`}); //이걸 해도 똑같더라.
        //     // res.end();
        // });

        delete req.session.is_logined; //그래서 이렇게 세션 중 로그인을 했는지 안했는지를 알려주는 세션을 두고 이거를 지우던가 새로 만들던가 하면서 로그인을 체크하도록 한다.
        res.redirect('/');

        // req.session.save(function(){ //세션을 상태를 세션 스토어에 저장하는 함수
        //     res.redirect('/');
        // });

        // req.logout();
        // res.redirect('/');
    });

    router.get('/register', function(req, res){
        var fmsg = req.flash();
        var feedback = '';
        if(fmsg.error){
            feedback = fmsg.error[0];
        }        

        var title = 'Web - login';
        var list = template.LIST(req.list);
        var html = template.HTML(title, list, `
            <div>${feedback}</div>
            <form action="/auth/register_process" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="password" name="password" placeholder="password"></p>
            <p><input type="password" name="password2" placeholder="password2"></p>
            <p><input type="text" name="nickname" placeholder="nickname"></p>
            <p><input type="submit" value="register"></p>
            </form>
        `, '');
        res.send(html);
    });

    router.post('/register_process', function(req, res){
        var post = req.body;
        var email = post.email;
        var password = post.password;
        var password2 = post.password2;
        var nickname = post.nickname;
        //여기에 추가할 것 : 1. 동일한 값이 있다면 오류 발생, 2. 비번과 비번확인이 다르다면 오류 발생, 3. 입력되지 않은 값이 있다면 오류 발생

        if(password !== password2){
            req.flash('error', 'password is not same!');
            res.redirect('/auth/register');
            return ;
        }
        //패스워드 암호화. 2번째 인자는 saltRounds로 10이 기본이며 암호 해킹 시 초당 접속 숫자를 제한한다. 숫자가 높을 수록 더 제한이 강해진다.
        //function내 hash는 실제 암호화된 패스워드를 말한다.
        bcrypt.hash(password, 10, function(err, hash){
            var user = {
                id: shortid.generate(),
                email: email,
                password: hash, //암호화된 패스워드를 저장한다.
                nickname: nickname
            };
            db.get('users').push(user).write();
            
            //바로 로그인 함.
            req.login(user, function(err){
            if(err){
                console.log(err);
            }
            return res.redirect('/');
        });
        });
    });

    return router;
}

// module.exports = router;