<?php

    //클래스 자체에 final을 하여 해당 클래스 자체를 상속받을 수 없게 할 수 있다.
    final Class CannotParentClass{
        function AA(){
            echo "final Class's function";
        }
    }

    class ParentClass{
        function a(){
            echo "Parent";
        }

        final function b(){
            echo "Parent B";
        }
    }

    class ChildClass extends ParentClass{
        function a(){
            echo "Child";
        }

        //final 한 부모의 함수는 오버라이딩 할 수 없다.
        // function b(){
        //     echo "Child B";
        // }
    }

    $obj = new ChildClass();
    $obj->a();
?>