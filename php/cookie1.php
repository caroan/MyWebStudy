<?php

    //쿠키는 보안상 신뢰할 수 없다. 보안이 필요한 정보는 세션을 통해서만 전달하거나 저장하도록 한다.
    //쿠키는 누구나 가져갈 수 있다.

    setcookie("mycookie01", "들어갈 정보");
    //mycookie01이라는 이름(key)을 가지고, 들어갈 정보라는 정보(value)를 가진 쿠키가 사용자의 브라우저에 저장된다.
    setcookie("mycookie02", time(), time()+60);
    //(key, value, 유효 시간)현재 부터 60초 이후까지만 정보가 유효하다. 시간이 지나면 브라우저에 의해 값이 삭제된다.

    //setcookie(key, value, expires, path, domain, secure, httponly, option)
    //key : 키, value : 내용, expires : 쿠키 만료 기간, path : 해당 경로에 진입했을때만 해당 쿠키 사용 가능.
    //domain : 해당 도메인(xxx.com)안에서만 유효함
?>

