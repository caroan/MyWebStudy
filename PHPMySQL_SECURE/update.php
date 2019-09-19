<?php
    $conn = mysqli_connect("localhost","root","dksd1702","opentutorialsdb");
    $sql = "SELECT * FROM topic LIMIT 1000";
    $result = mysqli_query($conn, $sql);

    $list = "";
    while($row = mysqli_fetch_array($result)){
        $escaped_title = htmlspecialchars($row['title']);
        $list = $list."<li>"."<a href=\""."index".".php?id=".$row['id']."\">".$escaped_title."</a></li>";
    }

    $article = array(
        'title' => 'Welcome',
        'description' => 'Hello Web'
    );

    if(isset($_GET['id'])){
        $filtered_id = mysqli_real_escape_string($conn, $_GET['id']); //<- 유저가 입력하는 것 중 쿼리문을 입력하는 것을 막기 위해 이를 필터링 해주는 함수 사용.
        $sql = "SELECT * FROM topic WHERE id = {$filtered_id}";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_array($result);

        $article['title'] = htmlspecialchars($row['title']);
        $article['description'] = htmlspecialchars($row['description']);
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
        <ol><?=$list;?></ol>
        <form action="process_update.php" method="POST">
            <input type="hidden" name="id" value="<?=$_GET['id']?>">
            <p><input type="text" name="title" placeholder="title" value="<?=$article['title']?>"></p>
            <p><textarea name="description" placeholder="description" cols="30" rows="10"><?=$article['description']?></textarea></p>
            <p><input type="submit"></p>
        </form>
    </body>
</html>