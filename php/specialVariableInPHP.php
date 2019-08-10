<html>
    <body>
        <?php
            //변수의 타입을 중간에 변경 하거나 해당 변수의 타입을 알 수 있음.
            $var01 = 100;
            echo gettype($var01);
            settype($var01, 'double');
            echo '</br>';
            echo gettype($var01);
            echo '</br>';

            //가변 변수(변수 값을 다른 변수의 이름으로 사용 가능)

            $title = 'subject';
            $$title = 'double packaging name';

            echo "\$title은 subject이고, \$(\$title)은 \$subject로 변환된다. 때문에 최종 값은 : ".$subject;
        ?>
    </body>
</html>