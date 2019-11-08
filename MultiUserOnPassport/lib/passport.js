module.exports = function(app){

    //원래는 아래처럼 코드에 있어서도 안되고 암호는 해쉬로 암호화 하도록 한다.
    var authData = {
    email: 'caroan',
    password: '1111',
    nickname: 'myungsun'
    }

    var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize()); //패스포트를 설치
    app.use(passport.session()); //내부적으로 패스포트가 세션을 활용해 그 위에서 동작하는 것이다.

    passport.serializeUser(function(user, done) {//처음 로그인 시 딱한번만 호출된다.
    console.log('SerializeUser : ', user);
    done(null, user.email); //done(널, 유저 구분자)
    });

    passport.deserializeUser(function(id, done) {//페이지를 열 때마다 계속 호출된다.
    console.log('DeserializeUser : ', id);
    done(null, authData);
    // User.findById(id, function(err, user) {
    //   done(err, user);
    // });
    });

    passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },//만약 패스포트의 형식으로 폼의 네임 값을 수정하고 싶지 않다면 위와 같이 그냥 내가 쓰고 싶은 네임값을 입력하도록 한다.
    function (username, password, done) {
        console.log(`LocalStrategy : ${username}, ${password}`);
        if(username===authData.email){
        console.log(1);
        if(password === authData.password){
            console.log(2);
            return done(null, authData, {message: '환영합니다.'});
        } else{
            console.log(3);
            return done(null, false, {message: '비밀번호가 틀렸습니다.'});  
        }
        } else{
        console.log(4);
        return done(null, false, {message: '유저 이름이 틀렸습니다.'});
        }
    }
    ));

    return passport;
}