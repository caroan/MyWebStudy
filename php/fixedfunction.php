<html>
    <head>
    </head>
    <body>
        <h1>function</h1>
        <?php
            $str = "Lorem ipsum dolor sit amet consectetur adipisicing elit.
            
            
            Praesentium sed cum vero similique. Sunt eaque voluptates porro perferendis labore harum dolor accusamus, officiis repudiandae nobis adipisci cum dolore atque recusandae.";
            echo $str;
        ?>
        <h2>strlen</h2>
        <?php
            echo strlen($str);
        ?>

        <h2>nl2br</h2>
        <?php
            echo nl2br($str);
        ?>
    </body>
</html>