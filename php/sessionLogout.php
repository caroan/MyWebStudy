<?php
    ini_set("display_errors", "1");
    session_start();
    session_destroy();
    //세션 데이터 모두 삭제됨.
    header("Location: ./sessionLogin.html")
?>