<?php
    $createBaseName = $_POST['title'];
    $createBaseDescription = $_POST['description'];
    file_put_contents("data/".$createBaseName, $createBaseDescription);
    header('Location: index.php?id='.$createBaseName); //<- 리다이렉션 기능으로 여기서는 내가 생성한 페이지로 그냥 옮겨버린다.
?>