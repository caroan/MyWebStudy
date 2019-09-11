<?php
    $con = mysqli_connect("localhost", "root", "dksd1702", "testdb")or die("접속 실패 !!!");

    $userID = $_GET['userID'];
    $sql = "SELECT * FROM test WHERE userID = "."'".$userID."'";

    $ret = mysqli_query($con, $sql);

    if($ret){
        $count = mysqli_num_rows($ret);
        if($count== 0){
            echo "해당하는 회원이 없음";
            exit();
            echo "<a herf='main.html'> 초기 화면 </a>";
        }
    }
    else{
        echo "오류 발생 !!";
        echo "오류 내용 : ". mysqli_error($con);
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
        <h1>회원 정보 삭제</h1>
        
        <FORM METHOD="post" ACTION="delete_result.php">
            아이디 : <INPUT TYPE="text" NAME="userID" VALUE=<?php echo $userID ?>><br>
            이름 : <INPUT TYPE="text" NAME="name" VALUE=<?php echo $name ?>><br>
            생년월일 : <INPUT TYPE="text" NAME="birthyear" VALUE=<?php echo $birthyear ?>><br>
            <INPUT TYPE="submit" VALUE="삭제">
        </FORM>
    </body>
</html>