<?php
    //기존 객체 지향을 안한 함수 지향 PHP
    echo "기존 함수 지향 프로그래밍<br/>";

    var_dump(is_file('data.txt'));
    var_dump(is_dir('data.txt'));
    file_put_contents('data.txt', rand(1,99));
    var_dump(file_get_contents('data.txt'));
    
    echo "<br/><br/>";
?>

<?php
    //php를 객체지향하려면 spl 라이브러리를 사용해야 한다.
    echo "file을 객체로 사용<br/>";
    $myFile = new SplFileObject('data3.txt', 'rw+');
    //파일을 객체로 만들어주는 코드
    //파일 읽기/쓰기 권한을 준다.

    var_dump($myFile->isFile());
    var_dump($myFile->isDir());
    $myFile->fwrite(rand(1,100));
    //파일을 쓴뒤
    $myFile->rewind();
    //파일의 포인트를 맨 앞으로 돌리고,
    var_dump($myFile->fread($myFile->getSize()));
    //맨 앞으로 온 것을 읽는다.
    
    
    echo "<br/><br/>";
?>