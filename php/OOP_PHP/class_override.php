<?php
    class ParentClass{

        function callMethod($param){
            echo "<h1>Parent {$param}</h1>";
        }
    }

    class ChildClass extends ParentClass{

        function callMethod($param){
            //자식에서 부모를 가져오고 싶으면 이렇게 한다.
            parent::callMethod($param);
            echo "<h1>Child {$param}</h1>";
        }
        //오버 라이드를 하려고 할 경우 형식이 같아야 한다.
        //위에서 만약 callMethod($param, $param2) 이렇게 한다면 에러가 나온다.
    }

    $obj = new ChildClass();
    $obj->callMethod('Method');
?>