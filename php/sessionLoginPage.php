<?php
    session_start();
    if(!isset($_SESSION['is_login'])){
        header('Location: ./sessionLogin.html');
    }
?>

<html>
    <body>
        <?php echo $_SESSION['nickname']; ?>님 환영합니다.<br/>
        <a href="./sessionLogout.php">로그아웃</a>
    </body>
</html>