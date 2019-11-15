//npm lowdb. 
var db = require('../lib/db');

module.exports = function(app){

    // var authData = {
    //     email: 'caroan',
    //     password: '1111',
    //     nickname: 'myungsun'
    // }

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize()); //패스포트를 설치
    app.use(passport.session()); //내부적으로 패스포트가 세션으 활용해 그 위에서 동작한다.

    //로그인을 설정하면 아래 함수들이 호출된다.
    passport.serializeUser(function(user, done){ //처음 로그인 시 딱 한번만 호출된다. user는 아래에서 authData를 의미한다.
        //console.log('serializeUser', user);
        done(null, user.id); //유저의 식별자 값을 여기에 넣어줘야 한다.(ex: 프라이머리 키) 그러면 패스포트의 유저값으로 해당 값이 들어가게 된다.
    });
    passport.deserializeUser(function(id, done){ //페이지를 열 때마다 계속 호출된다.
        var user = db.get('users').find({id:id}).value();
        //console.log('deserializeUser', id, user);
        done(null, user); //사용자의 실제 데이터가 저장된 곳(ex: DB)에서 데이터를 가져와 식별자랑 비교를 하며 어떤 값의 사용자 데이터를 가져와야 하는지 알게 된다.
        //위의 serializeUser에서 받은 식별자 값을 id에 넣고 done()에 넣은 authData 에서 식별자에 따른 정보를 확인해서 찾는다.
        //이후 여기서 request의 user에 authData가 저장된다.
    });

    passport.use(
        new LocalStrategy(//로컬 전략의 구체적 방식을 정의
            {
                usernameField: 'email', passwordField: 'password'
            },
            function(username, password, done){
                //console.log('LocalStrategy', username, password);
                //message는 플래시 메모리에서 사용한다.
                var user = db.get('users').find({email:username, password: password}).value();
                //console.log(user);
                if(user){
                    return done(null, user, { message: '환영합니다.'});
                }
                else{
                    return done(null, false, {message: '해당 유저가 없거나 비밀 번호가 틀렸습니다.'});
                }
                // if(username === authData.email){
                //     if(password === authData.password){
                //         return done(null, authData, { message: '환영합니다.'});
                //     }
                //     else{
                //         return done(null, false, {message: '비밀번호가 틀려습니다.'});
                //     }
                // }
                // else{
                //     return done(null, false, {message: '유저 이름이 틀렸습니다.'});
                // }
            }
        )
    );

    return passport;
}