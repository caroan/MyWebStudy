<?php
    $file = 'read.txt';
    $newFile = 'write.txt.bak';

    if(!(copy($file, $newFile))){ //파일 카피
        echo 'file copy failed\n';
    }else{
        echo 'copy success</br>';
    }

    unlink($newFile);//파일 삭제

    echo file_get_contents($file);

    //URL에서 파일을 읽어 올 수 있다.
    // $val = file_get_contents('https://ko.wikipedia.org/wiki/HTML');
    // echo $val;

    $writeFile = './writeFile.txt';

    file_put_contents($writeFile, 'write file here');

    //더 세밀하게 파일을 불러오고 싶다면 fopen을 사용해보도록 하자.

    if(file_exists($file)){
        echo "파일이 존재 합니다.";
    }
    if(is_readable($file)){
        echo "읽을 수 있습니다.";
    }
    if(is_writable($file)){
        echo "쓸 수 있습니다.";
    }

    echo '</br>';

    echo getcwd().'</br>';//현재 파일의 위치 표시
    chdir('../');
    echo getcwd().'</br>';//이동한 위치 표시

    $myDir = './';
    $fileDir1 = scandir($myDir);
    $fileDir2 = scandir($myDir, 1); // 역순으로 나옴.

    print_r($fileDir1);
    echo '</br>';
    print_r($fileDir2);

    echo '</br>';
    mkdir('1/2/3/4/5', 0777, true); //디렉토리 명, 루트/소유주/그룹/아더의 권한, 만약 디렉토리 명이 없을 경우 만들어 줄 지 물어보는 것.
?>