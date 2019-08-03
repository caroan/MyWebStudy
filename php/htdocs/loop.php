<html>
    <head>
    </head>
    <body>
        <h1>While</h1>
        <?php
            $i = 0;
            while($i < 3){
                $i ++;
                echo $i;
            }
        ?>

        <h1>For</h1>
        <?php
            $i = 0;
            for($i=0;$i<3;$i++){
                echo $i;
            }
        ?>

        <h1>break&continue</h1>
        <?php
        $i = 0;
            for($i =0; $i<10; $i++){
                if($i===2){
                    continue;
                }
                else if($i===5){
                    break;
                }
                echo $i;
            }
        ?>
    </body>
</html>