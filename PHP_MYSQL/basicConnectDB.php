<?php
    $db_host = "localhost"; //호스트를 자기 자신으로 잡는다. (만약 다른 DB에 접속해야 한다면 여기에 아이피를 적도록 한다.)
    $db_user="root"; //root 유저로 들어간다.
    $db_password = "dksd1702"; //root니까 비번이 없는 것뿐이지 무조건 해야 한다. <- 지금 나는 비번을 쓰므로 해당 비번을 사용한다.
    $db_name = "";
    
    // 아래 내용은 거의 모든 부분에서 다 쓰인다.
    $con = mysqli_connect($db_host, $db_user, $db_password, $db_name);
    if(mysqli_connect_error($con)){
        echo "MySQL 접속 실패 !!", "<br>";
        echo "오류 원인 : ", mysqli_connect_error();
        exit();
    }
    // 위의 내용이 보통 너무 길어서 아래와 같이 줄여서 쓰기도 한다.
    // $con = mysqli_connect("localhost", "root", "dksd1702","") or die("MySQL 접속 실패 !!");

    echo "MySQL 접속 완전히 성공 !!"."<br>";

    $sql = "USE testdb"; //쿼리문 생성
    $ret = mysqli_query($con, $sql); //쿼리문 적용
    if($ret){
        echo "USE testdb 를 완벽하게 함."."<br>";
    }else{
        echo " USE testdb 실패 !!!"."<br>";
        echo "실패 원인 : ".mysqli_error($con);
    }

    //CREATE TABLE
    // $sql = "CREATE TABLE test(
    //     userID CHAR(10) NOT NULL PRIMARY KEY,
    //     name VARCHAR(10) NOT NULL,
    //     birthyear INT NOT NULL
    // )"; //쿼리문 생성
    // $ret = mysqli_query($con, $sql); //쿼리문 적용
    // if($ret){
    //     echo "테이블생성을 완벽하게 함.";
    // }else{
    //     echo "테이블 생성 실패 !!!"."<br>";
    //     echo "실패 원인 : ".mysqli_error($con);
    // }

    //INSERT
    // $sql = "INSERT INTO test VALUES
    // ('KIM', '김범수', 2000),
    // ('KANG', '강속구', 1970),
    // ('NAM', '남진', 1990),
    // ('JUNG', '정형돈', 1980)"; //쿼리문 생성
    // $ret = mysqli_query($con, $sql); //쿼리문 적용
    // if($ret){
    //     echo "INSERT 를 완벽하게 함.";
    // }else{
    //     echo "INSERT 실패 !!!"."<br>";
    //     echo "실패 원인 : ".mysqli_error($con);
    // }

    //SELECT
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
        echo $row['userID'], " / ",$row['name'], " / ",$row['birthyear'], "<br>";
    }

    mysqli_close($con);
?>