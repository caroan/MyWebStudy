$(document).bind("mobileinit", function(){
    console.log("Mobile init timing");

    /* 페이지를 로드할 때 ajax 통신을 하지 않도록 한다.
    로드 대상이 되는 파일에 자바 스크립트가 있을 때 ajax로 페이지를 읽으면 오류가 발생하는 경우가 있는데
    이런 경우 ajax 통신을 하지 않는 것이 유용한다. 또한 장면 전환 효과를 사용하지 않는 경우도 사용할 수 있다.*/
    $.mobile.ajaxEnabled = false;

    /* 장면 전환 효과를 지정한다. 기본값은 fade로 페이드 효과를 준다.
    만약 쓰고 싶지 않다면 none을 사용하면 된다. 더 자세한 이야기는 아래 주소를 따라가보자.
    http://jquerymobile.com/demos/1.1.0/docs/pages/page-transitions.html */
    $.mobile.defaultPageTransition = 'slide';
});