<?php
    class MyFileObject{
        private $filename;
        function __construct($fname){
            $this->filename = $fname;
            if(!file_exists($this->filename)){
                die('there is no file '.$this->filename);
            }
        }

        function isFile(){
            return is_file($this->filename);
        }
    }

    $file = new MyFileObject("data.txt");
    //$wrongfile = new MyFileObject("nowhere.txt");
    var_dump($file->isFile());
    //var_dump($file->filename); //private 변수에 접근하므로 error를 만들어냄
?>

<?php

    echo "<br/><br/>";

    class Person{
        private $name;
        function sayHi(){
            print("Hi I'm {$this->name}");
        }
        function setName($_name){
            ifEmptyDie($_name);
            $this->name = $_name;
        }
        function getName(){
            return $this->name;
        }

        private function ifEmptyDie($value){
            if(empty($value)){
                die('I need name');
            }
        }
    }

    $an = new Person();
    $an->setName('an');
    $an->sayHi();
    print($an->getName());
?>