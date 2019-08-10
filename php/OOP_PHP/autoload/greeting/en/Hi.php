<?php
    namespace greeting\en;
    class Hi{
        function __construct(){
            echo "<h1>Hi construct called</h1>";
        }
    }
    //다음 네임 스페이스가 나오기 전까지 해당 네임 스페이스 아래의 클래스들은 해당 네임 스페이스에 해당하게 된다.
    echo "<p>Hi 클래스가 호출된다.</p>";
?>