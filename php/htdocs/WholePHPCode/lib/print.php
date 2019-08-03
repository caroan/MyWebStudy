<?php
    function printDescription(){
        if(isset($_GET["id"])){

            //보안 파일 보호 방식 1 - basename 함수 사용.
            //해커가 아래에서 주소의 ID에 ../secretDoc을 치면 해당 비밀 문서의 내용이 웹에 보이게 되어 버린다.
            echo "해당 파일의 경로가 다 입력되지 않음 : ".htmlspecialchars($_GET['id'])."<br>";
            echo "비밀 파일 경로 적용됨 : ".htmlspecialchars('data/'.$_GET['id'])."<br>";
            echo "비밀 파일 내용이 나옴 : ".htmlspecialchars( file_get_contents("data/".$_GET['id']))."<br><br>";

            //때문에 아래와 같이 basename 함수를 사용하면 경로가 사라져버리기에 유저가 해당 비밀 파일에 접속할 방법이 사라지게 된다.
            $myBasename = basename( htmlspecialchars ( $_GET['id']));
            echo "해당 파일의 경로가 다 입력되지 않음 : ".$myBasename."<br>";
            echo "비밀 파일 경로 적용 안됨 : ".htmlspecialchars('data/'.$myBasename)."<br>";
            echo "비밀 파일 내용이 안나옴 : ".htmlspecialchars( file_get_contents("data/".$myBasename))."<br><br>";
        }
        else{
            echo "hello php";
        }
    }

    function printTitle(){
        if(isset($_GET["id"])){ //해당 값이 언디파인이거나 널이 아니라면
            echo htmlspecialchars($_GET["id"]);
            //cross site scripting 해킹을 막기 위해 유저가 쓰는 모든 것이 스크립트로 읽히지 않도록 htmlspecialchars() 함수를 사용하도록 한다.  
        }else{
            echo "welcome";
        }
    }

    function printLists(){
        $list = scandir('./data');
        
        if(count($list) > 2){
            $i = 2;
            $myTitle = null;
            while($i< count($list)){
                $myTitle = htmlspecialchars($list[$i]);
                if($list[$i] === ".DS_Store"){ // 맥에서 .DS_Store는 파일 관리 자동 생성 파일로 이것을 안보이게 하도록 해당 코드를 사용한다.
                    $i++;
                    continue;
                }
                echo "<li><a href=\"index.php?id=".$myTitle."\">".$myTitle."</a></li>\n\t\t\t";
                // '을 쓰면 뒤쪽의 \n이 안 먹힌다. 그래서 "을 사용함.
                $i ++;
            }
        }
    }
?>