<?php
    require('lib/print.php'); // 다른 곳의 파일을 불러온다.
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
         <form action="modify_process.php" method="post">
             <input type="hidden" name="old_title" value = "<?=$_GET['id'];?>">
            <p><input type="text" name="title" placeholder="Title" value="<?php printTitle(); ?>"></p>
            <p><textarea name="description" placeholder="description"><?php printDescription(); ?></textarea></p>
            <p><input type="submit"></p>
        </form>
<?php
    require('view/bottom.php');
?>