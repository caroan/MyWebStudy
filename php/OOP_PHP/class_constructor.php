<?php
    class MyFileObject{
        function __construct($fname){
            //__construct <- 생성자의 고정이름
            $this->filename = $fname;
        }
        function isFile(){
            return is_file($this->filename);
        }
    }

    $file = new MyFileObject('data.txt');
    var_dump($file->isFile());
    var_dump($file->filename);
?>