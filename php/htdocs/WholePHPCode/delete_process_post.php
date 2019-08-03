<?php
    //여기서도 포스트 임에도 유저가 툴로 무슨 데이터가 오고 가는지 확인한 동일한 데이터를 주고 받는 문서를 만들어 이를 적용해버리는 문제가 발생하기에
    //아래와 같이 여기서도 basename을 사용하도록 한다.
    $myDelBaseName = basename($_POST['id']);
    unlink("data/".$myDelBaseName);
    header('Location: index.php'); //<- 리다이렉션 기능으로 여기서는 내가 생성한 페이지로 그냥 옮겨버린다.
?>