<?php
    class MyFileObject{
        function isFile(){
            return is_file($this->filename);
            //this->filename이라고 안하고 그냥 filename이라고 하면 해당 변수 이름이 없다고 나온다.
        }
    }

    $file = new MyFileObject();
    $file->filename = 'data.txt';
    //클래스 설계상 가지고 있지 않은 변수를 선언하여 사용할 수 있다.
    
    var_dump($file->isFile());
    var_dump($file->filename);

    $file2 = new MyFileObject();
    $file2->filename = 'data3.txt';

    var_dump($file2->isFile());
    var_dump($file2->filename);
?>