<?php
    $conn = mysqli_connect("localhost","root","dksd1702","opentutorialsdb");
    $sql = "SELECT * FROM topic LIMIT 1000";
    $result = mysqli_query($conn, $sql);
    //mysqli_multi_query <- 여러개의 쿼리를 한꺼번에 실행해주는 함수로, 여러 쿼리로 쪼개서 공격하는 것에 보안이 취약하여 이를 방어하기 위해 가능한 안쓰는 게 좋다.

    $list = "";
    while($row = mysqli_fetch_array($result)){
        $escaped_title = htmlspecialchars($row['title']);
        $list = $list."<li>"."<a href=\""."index".".php?id=".$row['id']."\">".$escaped_title."</a></li>";
    }

    $article = array(
        'title' => 'Welcome',
        'description' => 'Hello Web',
        'name' => ''
    );

    $update_link = "";
    $delete_link = "";
    $author ="";

    if(isset($_GET['id'])){
        $filtered_id = mysqli_real_escape_string($conn, $_GET['id']); //<- 유저가 입력하는 것 중 쿼리문을 입력하는 것을 막기 위해 이를 필터링 해주는 함수 사용.
        $sql = "SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id={$filtered_id}";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_array($result);
        $article['title'] = htmlspecialchars($row['title']);
        $article['description'] = htmlspecialchars($row['description']);
        $article['name'] = htmlspecialchars($row['name']);

        $update_link = $update_link.'<a href="update.php?id='.$_GET['id'].'">update</a>';
        $delete_link = '
        <form action="process_delete.php" method="post">
            <input type="hidden" name="id" value="'.$_GET['id'].'">
            <input type="submit" value="delete">
        </form>
        ';
        $author = "<p>by ".$article['name']."</p>";
    }
?>

<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>WEB</title>
    </head>
    <body>
        <h1><a href="index.php">WEB</a></h1>
        <a href="author.php">author</a>
        <ol><?=$list;?></ol>
        <p><a href="create.php">create</a></p>
        <?=$update_link?>
        <?=$delete_link?>
        <h2><?=$article['title']?></h2>
        <?=$article['description']?>
        <?=$author?>
    </body>
</html>