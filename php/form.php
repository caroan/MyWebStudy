<?php
    //GET으로 전송을 받음
    // file_put_contents("data/".$_GET['title'], $_GET['Description']);
    // echo "<p> title : ".$_GET['title']."</p>";
    // echo "<p> Description : ".$_GET['Description']."</p>";

    //POST로 전송을 받음
    file_put_contents("data/".$_POST['title'], $_POST['Description']);
    echo "<p> title : ".$_POST['title']."</p>";
    echo "<p> Description : ".$_POST['Description']."</p>";
?>