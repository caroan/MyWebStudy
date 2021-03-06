<?php
    //쿠키나 세션이나 사용자의 상태를 유지시킨다는 것은 동일
    //쿠키 : 모든 데이터를 브라우저에 저장.
    //세션 : 현재 이것이 누구 인지 식별하는 식별자만 브라우저에 저장하고, 실제 정보는 파일이나 DB에만 저장한다.
    //쿠키 : 데이터 유출 가능.
    //세션 : 주요 데이터는 서버상에만 저장됨.

    session_save_path('./session');
    //대부분의 경우 사용 안함.  사용자가 세션 데이터를 저장할 때, 서버상에 파일로 저장되는데 어디에 저장되는지 지정하는 것.
    //미리 직접 해당 경로에 해당 폴더를 만들어두고 있어야 한다.
    session_start();
    //세션을 사용한다는 것. 반드시 사용함.
    $_SESSION['title'] = "my name is myungsun";
?>