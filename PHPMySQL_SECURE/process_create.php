<?php

    $conn = mysqli_connect("localhost","root","dksd1702","opentutorialsdb") or die("connect problem !!!");
    var_dump($_POST);
    $filtered_title = mysqli_real_escape_string($conn, $_POST['title']); //<- 유저가 입력하는 것 중 쿼리문을 입력하는 것을 막기 위해 이를 필터링 해주는 함수 사용.
    $filtered_description = mysqli_real_escape_string($conn, $_POST['description']); //<- 유저가 입력하는 것 중 쿼리문을 입력하는 것을 막기 위해 이를 필터링 해주는 함수 사용.
    $filtered_id = mysqli_real_escape_string($conn, $_POST['author_id']); //<- 유저가 입력하는 것 중 쿼리문을 입력하는 것을 막기 위해 이를 필터링 해주는 함수 사용.
    $sql = "INSERT INTO topic(title, description, created, author_id) VALUES('{$filtered_title}', '{$filtered_description}', NOW(), '{$filtered_id}')";

    $result = mysqli_query($conn, $sql);

    if($result){
        echo "성공했습니다.". '<a href="index.php">돌아가기</a>';
    }else{
        echo 'Insert error !!!';
        error_log(mysqli_error($conn)); //<-아파치 에러 로그에 기록됨
        exit();
    }
    echo "<br>".$sql;
?>