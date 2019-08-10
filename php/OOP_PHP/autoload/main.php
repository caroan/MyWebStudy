<?php
//    require_once 'Hi.php';
    require_once 'autoload.php';

    //ko, en 둘다 인사말이므로 greeting으로 묶어줄 수 이다.(네임스페이스는 결국 자바의 패키지 개념이다.)
    new \greeting\en\Hi();
    new \greeting\ko\Hi();

    //위의 패키지 명이 너무 장황하므로 아래와 같이 하나로 묶을 수 있다.

/*  use \greeting\en;
    new en\Hi();

    use \greeting\ko;
    new ko\Hi();
*/

/*
    //아래와 같이 ,으로 하나로 묶는 것도 가능하다.
    use \greeting\en, \greeting\ko;
    new en\Hi();
    new ko\Hi();

*/

    //아래와 같이 아래와 같은 경로를 특별 함수 이름으로 수정할 수 있다.
    use \greeting\en\Hi as HiEn;
    use \greeting\ko\Hi as HiKo;
    new HiEn();
    new HiKo();

    //현재 정의되어 있지 않은 클래스가 있는 경우 spl_autolaod_register 함수를 불러서 거기에 인자로 들어가 있는 함수를 호출하게 된다.
    //위쪽의 require_once를 주석 해제 하면 이 함수가 호출 안됨.
    //new Hi();
?>