<?php
    unlink("data/".$_GET['id']);
    header('Location: index.php'); //<- 리다이렉션 기능으로 여기서는 내가 생성한 페이지로 그냥 옮겨버린다.
?>