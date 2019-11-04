var http = require('http');
var cookie = require('cookie');
http.createServer(function(request, response){
    console.log(request.headers.cookie);
    var cookies = {};
    if(request.headers.cookie !== undefined){
        cookies = cookie.parse(request.headers.cookie);
        console.log(cookies.yummy_cookie);
    }
    
    // 서버가 웹브라우저에게 셋 쿠키 헤더를 보냄
    response.writeHead(200, {
        'Set-Cookie':[
            'yummy_cookie=choco',
            'tasty_cookie=strawberry', //이렇게 아무런 값도 안주면 기본적으로 세션 쿠기(브라우저가 켜 있는 동안에만 작동하는 쿠키) 를 생성하게 된다.
            `Permanent=cookies; Max-Age=${60*60*24*30}`,//Max-age :현재 시점 쿠기 수명, Expires : 쿠키가 언제 죽을 지 알려줌. 초단위로 들어간다.
            `Secure=secure; Secure`, //https에서만 사용할 수 있는 쿠키
            `httpOnly=httpOnly; HttpOnly`, //자바 스크립트 눈에는 보이지 않음.(자바 스크립트 피싱을 피하려고.) 웹 서버와 통신 할때만 발행한다.
            `Path=path; Path=/Cookies` //특정 경로에서만 사용되는 쿠키
            `domain=Domain; Domain=o2.org` //입력한 도메인의 어떤 서브 도메인에서도 살아남는 다는 뜻.
        ]
    });
    response.end('Cookies');
}).listen(3000);