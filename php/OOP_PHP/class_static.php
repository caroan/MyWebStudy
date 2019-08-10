<?php
    class Person{
        private static $count =0;
        private $name;
        function __construct($name){
            $this->name = $name;
            self::$count = self::$count+1;
        }

        function enter(){
            echo "<h1>Enter : ".$this->name." ".self::$count."</h1>";
        }
        static function getCount(){
            return self::$count;
        }
    }

    $p1 = new Person('an');
    $p1->enter();

    $p2 = new Person('kim');
    $p2->enter();

    $p3 = new Person('jung');
    $p3->enter();

    $p4 = new Person('kang');
    $p4->enter();

    echo Person::getCount();
?>