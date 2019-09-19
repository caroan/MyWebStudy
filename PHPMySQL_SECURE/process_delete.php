<?php

    $conn = mysqli_connect("localhost","root","dksd1702","opentutorialsdb") or die("connect problem !!!");

    settype($_POST['id'], 'integer'); //<-  값을 정수로 수정함.
    $filtered = array(
        'id' => htmlspecialchars(mysqli_real_escape_string($conn, $_POST['id']))
    );

$sql = "DELETE FROM topic WHERE id = {$filtered['id']}";
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