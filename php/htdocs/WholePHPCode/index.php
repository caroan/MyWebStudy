<!-- php의 api 종류 : php.net 의 문서 확인
     php composer : php 패키지 매니저
     또한 data안의 내용은 DB로 변경할 수 있다.
     php cookie / session을 사용해 사용자 로그인/회원가입을 사용가능 (쿠키는 잘 안씀)
     federation authentication을 사용해 페북/구글 연동 로그인 사용 가능 -->
<?php
    require_once('lib/print.php'); //리쿼이어를 한번만 한다.(중복해서 호출하지 않도록)
    require('view/top.php');
?>
            <?php
                printLists();
            ?>

            <!-- <li><a href="index.php?id=HTML">HTML</a></li>
            <li><a href="index.php?id=CSS">CSS</a></li>
            <li><a href="index.php?id=Javascript">Javascript</a></li> -->
        </ol>
        <a href="create.php">create</a>
        <?php
            if(isset($_GET['id'])){?>
                <a href="modify.php?id=<?= $_GET['id']; ?>">modify</a>
                <!-- <a href="delete_process.php?id=<?= $_GET['id']; ?>">delete</a> -->
                <!-- 옆처럼 링크 방식의 겟 방식을 사용하면 링크로 삭제 버튼을 다른 이에게 보내 원격으로 지울 수 있는 문제가 발생하게 된다. -->
                <!-- 때문에 아래와 같이 포스트 방식을 사용하도록 한다. -->
                <form action="delete_process_post.php" method="POST">
                    <input type="hidden" name="id" value="<?=$_GET['id'] ?>">
                    <input type="submit" value="delete">
                </form>

                <?php //위 <?php echo $_GET['id]를 <?php echo $_GET['id'];로 써도 됨 ?>
            <?php } ?>
        <h2>
        <?php
            printTitle();
        ?>
        </h2>
        <?php
            printDescription();
        ?>
<?php
    require('view/bottom.php');
?>