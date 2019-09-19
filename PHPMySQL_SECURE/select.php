<?php
    $conn = mysqli_connect("localhost","root","dksd1702","opentutorialsdb");

    $sql = "SELECT * FROM topic LIMIT 1000"; //<- 모든 데이터를 가져오는 것은 위험하다.

    $result = mysqli_query($conn, $sql);

    $row = mysqli_fetch_array($result);
    //print_r(mysqli_fetch_array($result));
    //echo $row[0]." = ".$row['id'];

    echo '<h1>'.$row['title'].'</h1>';
    echo $row['description'];

    //var_dump($result->num_rows);
?>