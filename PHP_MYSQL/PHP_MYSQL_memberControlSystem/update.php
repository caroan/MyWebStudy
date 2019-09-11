<?php
    $con = mysqli_connect("localhost", "root", "dksd1702", "testdb") or die("접속 실패 !!!");
    $sql = "SELECT * FROM test WHERE userID = "."'".$_GET['userID']."'";

    $ret = mysqli_query($con, $sql);

    if($ret){
        $count = mysqli_num_rows($ret);
        if($count == 0){
            echo $_GET['userID']." 아이디의 회원이 없다."."<br>";
            echo "<a herf='main.html'> 초기 화면 </a>";
            exit();
        }
    }
    else{
        echo "데이터 조회 실패"."<br>";
        echo "실패 원인 : ".mysqli_error($con);
        echo "<a herf='main.html'> 초기 화면 </a>";
        exit();
    }

    $row = mysqli_fetch_array($ret);
    $userID = $row['userID'];
    $name = $row['name'];
    $birthyear = $row['birthyear'];
?>

<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf8">
    </head>
    <body>
        <h1>회원 정보 수정</h1>
        
        <FORM METHOD="post" ACTION="update_result.php">
            아이디 : <INPUT TYPE="text" NAME="userID" VALUE=<?php echo $userID ?>><br>
            이름 : <INPUT TYPE="text" NAME="name" VALUE=<?php echo $name ?>><br>
            생년월일 : <INPUT TYPE="text" NAME="birthyear" VALUE=<?php echo $birthyear ?>><br>
            <INPUT TYPE="submit" VALUE="수정">
        </FORM>
    </body>
</html>