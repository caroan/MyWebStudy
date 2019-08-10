<?php
    ini_set("display_error", "1");
    session_save_path("./session");
    session_start();
    //세션을 사용하고 싶으면 스타트를 무조건 해야 한다.
    echo $_SESSION['title'];
    echo file_get_contents('./session/sess_'.session_id());
?>