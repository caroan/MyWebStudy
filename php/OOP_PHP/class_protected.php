<?php
    class ParentClass{
        //public : 모두 접근, private : 자식 접근 불가, protected : 자식 접근, 외부 접근 불가.
        public $_public = '<h1>public</h1>';
        protected $_protected = "<h1>protected</h1>";
        private $_private = "<h1>private</h1>";
    }
    class ChildrenClass extends ParentClass{
        function callPublic(){
            echo $this->_public;
        }
        function callProtected(){
            echo $this->_protected;
        }
        function callPrivate(){
            $this->private;
        }
    }

    $obj = new ChildrenClass();

    echo $obj ->_public;
    //echo $obj ->_protected;
    //echo $obj ->_private;
    $obj ->callPublic();
    $obj ->callProtected();
    $obj ->callPrivate();
?>