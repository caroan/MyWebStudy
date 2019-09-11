<?php
    $con = mysqli_connect("localhost", "root", "dksd1702","testdb") or die("MySQL 접속 실패 !!");

    $sql = "SELECT * FROM test";
    $ret = mysqli_query($con, $sql);

    if($ret){
        echo mysqli_num_rows($ret), "건이 조회되었습니다.<br><br>";
    }
    else{
        echo "SELECT문 실패"."<br>";
        echo "실패 원인 : ".mysqli_error($con);
        exit();
    }
    while($row = mysqli_fetch_array($ret)){ //SELECT 한것에 대해서 한행씩 접근하고 또한 각각 한열씩 접근해야한다. 또한 맨 마지막으로 가면 false를 리턴한다.
        echo $row['userID'], " / ",$row['name'], " / ",$row['birthyear'];
        echo ' / <a href="update.php?userID=', $row['userID'], '">수정</a>';
        echo ' / <a href="delete.php?userID=', $row['userID'], '">삭제</a>';
        echo "<br>";
    }

    mysqli_close($con);
?>

<html>
    <p>
        <a href="main.html">돌아가기</a>
    </p>
</html>