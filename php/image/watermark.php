<?php
    $stamp = imagecreatefrompng('text.png');//들어갈 텍스트
    $im = imagecreatefrompng('original.png');//바탕 화면

    $marge_right = 10;
    $marge_bottom = 10;

    $sx = imagesx($stamp);
    $sy = imagesy($stamp);
    //텍스트의 가로 / 세로 크기

    imagecopy($im, $stamp, imagesx($im)-$sx-$marge_right, imagesy($im) - $sy - $marge_bottom,
     0, 0, imagesx($stamp), imagesy($stamp));
    //(목적지, 소스, 텍스트의 x좌표, 텍스트의 y좌표, 사용할 텍스트 이미지의 x시작점, 사용할 텍스트 이미지의 y시작점, 사용할 텍스트 이미지 x끝점, 사용할 텍스트 이미지의 y끝점)

    header('Content-type: image/png');
    //헤더에 앞서서 데이터를 출력하지 않는 한 뒤쪽에 헤더가 와도 크게 문제 없음.
    imagepng($im);
    imagedestroy($im);
?>