<?php
    $arr = array(1,2,3);
    array_push($arr, 4);
    foreach($arr as $item){
        echo $item."<br/>";
    }
    var_dump(count($arr));

    echo "<br/>";

    $o_arr = new ArrayObject(array(1,2,3));
    $o_arr->append(4);
    foreach($o_arr as $item){
        echo $item."<br/>";
    }
    var_dump($o_arr->count());
?>