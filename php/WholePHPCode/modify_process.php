<?php
    $modiBaseOldName = $_POST['old_title'];
    $modiBaseName = $_POST['title'];
    $modiBaseDesc = $_POST['description'];
    rename("data/".$modiBaseOldName, "data/".$modiBaseName);
    file_put_contents("data/".$modiBaseName, $modiBaseDesc);
    header('Location: index.php?id='.$modiBaseName); //<- 리다이렉션 기능으로 여기서는 내가 생성한 페이지로 그냥 옮겨버린다.
?>