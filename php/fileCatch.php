<!DOCTYPE html>
<html>
    <head>
    <meta charset="utf-8"/>
    </head>
    <body>
        <?php
//var_dump($_FILES);
//$_FILES에서 userfile(업로드 파일 name)에 5개의 정보를 배열로 갖고 있다.(파일 이름, 파일 타입, 파일 임시 이름(파일을 이후 처리하기 전에 갖고 있을 임시 이름을 갖고 있는다.), 에러 정보, 크기)
//2개 이상의 파일을 업로드 할 경우 $_FILES에서 일단 2개의 name을 배열로 갖고 있고 각각 5개의 정보를 배열로 가지고 있다.
//exit; //php 애플리케이션을 바로 종료(이 밑에 부분은 실행 X)
            ini_set("display_error", "1");//php의 설정을 런타임으로 지정하는 것. php.ini 설정 문서의 내용을 여기 코드에서만 수정해서 쓰도록 해준다.
            $uploaddir = "fileFolder//";//'\Applications\mampstack-7.3.7-1]\apache2\htdocs\\'; //임시 디렉토리로 업로드된 파일을 정식으로 어디에 두어야 하는지 알려주는 것.
            $uploadfile = $uploaddir . basename($_FILES['userfile']['name']);

            echo '<pre>';

            if(move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)){ //임시 디렉토리를 최종적으로 위치해야 하는 디렉토리로 이동.&move_uploaded_file 함수는 업로드된 파일이 이상없는지 확인해준다. 이상하면 false리턴, 이상 없으면 true 리턴.
                echo '파일이 유효하고 성공적으로 업데이트 되었습니다.';
            }
            else{
                print "파일 업로드 공격의 가능성이 있습니다.\n";
            }

            echo "자세한 디버깅 정보 입니다.";
            print_r($_FILES); //var_dump랑 비슷
            print "</pre>";
        ?>

        <img src="fileFolder/<?=$_FILES['userfile']['name']?>" />
    </body>
</html>