<?php
    function printDescription(){
        if(isset($_POST["id"])){
            echo file_get_contents("data/".$_POST['id']);
        }
        else{
            echo "hello php";
        }
    }

    function printTitle(){
        if(isset($_POST["id"])){ //해당 값이 언디파인이거나 널이 아니라면
            echo $_POST["id"];
        }else{
            echo "welcome";
        }
    }

    function printLists(){
        $list = scandir('./data');
        
        if(count($list) > 2){
            $i = 2;
            while($i< count($list)){
                echo "<li><a href=javascript:goPageWithPost('".$list[$i]."')>".$list[$i]."</a></li>\n\t\t\t";
                // '을 쓰면 뒤쪽의 \n이 안 먹힌다. 그래서 "을 사용함.
                $i ++;
            }
        }
    }
?>
<html>
    <head>
        <script src="http://code.jquery.com/jquery-latest.js"></script>
        <script>
            function goPageWithPost(myID){
                var myPage = document.postTrans;
                myPage.id.value = myID;
                myPage.action = "index_post.php";
                myPage.submit();
            }
        </script>
    </head>
    <body>
        <h1>Web</h1>
        <ol>
            <?php
                printLists();
            ?>

            <!-- <li><a href="index.php?id=HTML">HTML</a></li>
            <li><a href="index.php?id=CSS">CSS</a></li>
            <li><a href="index.php?id=Javascript">Javascript</a></li> -->
        </ol>
        <a href="create.php">create</a>
            <form name="postTrans" method="POST">
                <input type="hidden" name="id">
            </form>
        <h2>
            <?php
                printTitle();
            ?>
        </h2>
        <?php
            printDescription();
        ?>
    </body>
</html>