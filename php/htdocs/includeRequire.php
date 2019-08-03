<?php

    include 'includeRequire2.php';//include : 찾는 파일이 없을 경우 그냥 워닝만 띄움
    require 'includeRequire3.php';//require : 찾는 파일이 없을 경우 에러 띄움.
    //둘다 *_once를 가지고 있다.

    echo includeFunc();
    echo requireFunc();

?>