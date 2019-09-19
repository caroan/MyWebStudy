<?php

    $conn = mysqli_connect("localhost","root","dksd1702","opentutorialsdb") or die("connect problem !!!");
    
    $filtered = array(
        'name' => mysqli_real_escape_string($conn, $_POST['name']),
        'profile' => mysqli_real_escape_string($conn, $_POST['profile'])
    );


    $sql = "INSERT INTO author(name, profile) VALUES('{$filtered['name']}', '{$filtered['profile']}')";

    $result = mysqli_query($conn, $sql);

    if($result){
        header('location:author.php'); // 리다이렉션
    }else{
        echo 'Insert error !!!';
        error_log(mysqli_error($conn)); //<-아파치 에러 로그에 기록됨
        exit();
    }
?>