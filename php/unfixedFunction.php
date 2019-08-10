<html>
    <head>
    </head>
    <body>
        <h1>function</h1>
        <h2>Basic</h2>
        <?php
            function basic(){
                print('Basic function Called</br>');
            }
            basic();
        ?>
        <h2>param & argu Fuction</h2>
        <?php
            function summery($left, $right){ //<- 파라미터
                print("3+4= ".($left + $right)."</br>"); //괄호 안하면 문제 생김.
            }
            summery(3,4);//<- 아귀먼트
        ?>

        <h2>return function</h2>

        <?php
            function rSummery($left, $right){
                return $left+$right;
            }

            print(rSummery(3,4));
            file_put_contents('result_txt', rSummery(3,4));//파일을 가져와서 거기에 입력하는 함수(내장 함수임)
        ?>

        <h2>function param basic value</h2>
        <?php
            $glo = 100;
            function basicValue($b=100){//유저가 함수 호출 시 해당 아귀에 아무것도 안주면 기본 값이 들어간다.
                global $glo; //이런식으로 글로벌 변수에 접근 가능 (어지간해서는 쓰지 말것)
                $glo = 2;
                return $b;
            }

            echo basicValue(2)." & ".basicValue();;
        ?>

        <h2>array</h2>
        
        <?php
            function getArr(){
                return [1,2,3,4,5];
            }

            echo getArr()[2]; //옆의 방식은 PHP 5.4 이후에서만 사용 가능.

        ?>
    </body>
</html>