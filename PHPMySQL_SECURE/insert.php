<?php
    $mysqli = mysqli_connect("localhost","root","dksd1702","opentutorialsdb") or die("접속 실패!!");
    $result = mysqli_query($mysql, "INSERT INTO topic VALUE('MySQL', 'MySQL is ...', NOW())");
    
    if($result){
        $row = mysqli_fetch_assoc($result);
    }else{
        echo mysqli_error($mysqli);
        exit();
    }
    echo $row['id'];

    mysqli_close($mysqli);
?>