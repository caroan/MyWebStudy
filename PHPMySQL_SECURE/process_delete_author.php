<?php

    $conn = mysqli_connect("localhost","root","dksd1702","opentutorialsdb") or die("connect problem !!!");
    
    $filtered = array(
        'id' => mysqli_real_escape_string($conn, $_POST['id'])
    );

    $sql = "DELETE FROM topic WHERE author_id = {$filtered['id']}"; //데이터 완결성 때문에 저자를 지우면 토픽에서 해당 사람이 쓴 글을 지워버린다.
    mysqli_query($conn, $sql);

    $sql = "DELETE FROM author WHERE id = {$filtered['id']}";
    $result = mysqli_query($conn, $sql);

    if($result){
        header('location:author.php'); // 리다이렉션
    }else{
        echo 'Delete error !!!';
        error_log(mysqli_error($conn)); //<-아파치 에러 로그에 기록됨
        exit();
    }
?>