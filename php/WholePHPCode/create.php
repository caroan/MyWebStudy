<?php
    require('lib/print.php');
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
        <form action="create_process.php" method="post">
            <p><input type="text" name="title" placeholder="Title"></p>
            <p><textarea name="description" placeholder="description"></textarea></p>
            <p><input type="submit"></p>
        </form>
<?php
    require('view/bottom.php');
?>