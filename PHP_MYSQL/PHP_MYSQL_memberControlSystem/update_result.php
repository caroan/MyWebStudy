<?php
    $con = mysqli_connect("localhost", "root", "dksd1702", "testDB") or die("접속 실패");

    $userID = $_POST["userID"];
    $name = $_POST["name"];
    $birthyear = $_POST["birthyear"];

    $sql = "UPDATE test SET name='".$name."', birthyear = ".$birthyear." WHERE userID ="."'".$userID."'";

    $ret = mysqli_query($con, $sql);

    echo "<h1>회원정보 수정 결과</h1>";

    if($ret){
        echo "데이터가 성공적으로 수정됨.";
    }
    else{
        echo "데이터 수정 실패 !!!"."<br>";
        echo "실패 원인 : ".mysqli_error($con);
    }

    mysqli_close($con);
?>

<html>
    <p>
        <a href="main.html">돌아가기</a>
    </p>
</html>