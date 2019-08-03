<html>
    <body>
        <?php
            define('var1', 'unchangedValue');
            echo "var1 value is : ".var1."</br>";
            define('var1', 'ischange?');//<- 상수에 다른 수를 입력하려고 하니 에러 남.
        ?>
    </body>
</html>