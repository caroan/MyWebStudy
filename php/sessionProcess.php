<?php
    session_start();
    $id = 'caroan';
    $pwd = 'dksd2134';

    if(!empty($_POST['id']) && !empty($_POST['pwd'])){
        if($_POST['id'] === $id && $_POST['pwd'] === $pwd){
            $_SESSION['is_login'] = true;
            $_SESSION['nickname'] = '카로안';
            header('Location: ./sessionLoginPage.php');
            //헤더를 통한 리다이렉션
            exit;
        }
    }

    echo '로그인 불가';
?>