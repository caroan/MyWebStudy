<html>
    <head>
    </head>
    <body>
        <h1>array</h1>
        <?php
            $coworker = array('an', 'lee', 'kim');
            echo $coworker[1];
            echo " ";
            echo $coworker[0];
            echo " ";
            var_dump(count($coworker));

            array_push($coworker, 'park');
            echo $coworker[3];
            var_dump($coworker);
        ?>

        <h1>연관 배열</h1>

        <?php
            $grades = array('Math'=>100, 'Korean'=>98, 'English'=>91, 'Science'=>99);
            $social = [];
            $social['kim']='myngsoo';
            $social['jae']='hyunwoo';
            $social['kang']='chanil';
            var_dump($social);
            echo "</br>";
            echo $grades['Math'];
            echo "</br>";

            foreach($grades as $key => $value){
                echo $key." : ".$value."</br>";
            }
        ?>
    </body>
</html>