<?php
    function myAutoloader($path){
        //없는 클래스의 이름을 호출하는 함수에 해당 클래스의 이름을 넣어서 콜백한다.
        var_dump("{$path}가 정의 되어 있지 않아서 호출됨.");
        $path = str_replace('\\', '/',$path);//맥은 폴더 구분자를 \가 아닌 /이므로 이를 수정함.
        $path = $path.".php";
        require_once $path;
    }
        spl_autoload_register('myAutoloader');
    
    /*
        //위 내용을 아래와 같이 익명 함수로 호출 시킬 수 있다.
        spl_autoload_register(function ($path){
            var_dump("{$path}가 정의 되어 있지 않아서 호출됨.");
            $path = str_replace('\\', '/',$path);//맥은 폴더 구분자를 \가 아닌 /이므로 이를 수정함.
            $path = $path.".php";
            require_once $path;
        });
    */
?>