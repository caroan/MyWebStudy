<html>
    <head>
        <script src="http://code.jquery.com/jquery-latest.js"></script>
    </head>
    <body>        
        <?php
            if(preg_match("/php/i", "PHP is the web scripting language of choice")){
                //정교 표현 식을 쓰는 함수 preg_*를 사용. i를 사용해 대소문자 구분 x
                echo 'Match ';
            }
            else{
                echo "Not Match ";
            }

            if(preg_match("/\bweb\b/i", "PHP is the web scripting language")){
                //정규 표현식 : \b단어\b 단어 앞뒤로 아무것도 없는 상태를 의미
                echo "Match ";
            }
            else{
                echo "Not Match ";
            }

            if(preg_match("/\bweb\b/i", "PHP is website scripting language")){
                echo "match ";
            }
            else{
                echo "Not match ";
            }
        ?>

        <?php
            echo "</br></br>";
            $subject = "coding everybody http://opentutorial.org anmyungsun 010221-1923-12344";
            preg_match("/c...../", $subject, $result);
            echo "</br>";
            print_r($result[0]);
            echo "</br>";
            preg_match("/http:\/\/\w+./", $subject, $result);
            // w: 뒤의 단어를 의미, +: 한 문장을 의미, .: 애니 캐릭터.
            print_r($result[0]);
            echo "</br>";
            preg_match("/http:\/\/\w+.\w+\s/", $subject, $result);
            // s: 공백, t: 탭
            print_r($result[0]);
            echo "</br>";
            preg_match("/(http:\/\/\w+.\w+)\s(\w+)/", $subject, $result);
            // 괄호로 각 단락을 구분 지을 수 있다.
            //[0]: 정규표현식으로 뽑아낸 전체 문장 , [1]: 첫번째 괄호, [2]: 두번째 괄호, ...
            print_r($result);
        ?>

        <?php
            echo "</br></br>";
            preg_match('@^(?:http://)?([^/]+)@i', "http://www.php.net/index.html", $matches);
            //@ :구분자, i :대소문자구별X, ^ :그 행의 시작점. 그 행에서 ()에 오는 문자로 시작하는지를 찾는다.(http://대신 dump http://로 하면 못찾는다.)
            //?: :$matches 안에 해당 괄호의 문자가 담기지 않게 된다.(http://가 $matches에 담기지 않는다.)
            //? : 앞의 괄호나 문자가 없거나 하나만 등장하게 한다. 만약 http://가 없어도 상관없게 해줌.
            //[^] : 대괄호 안의 ^는 not을 의미한다. (대괄호 바깥쪽에 쓰일 경우 위의 ^과 동일함). 여기서는 /가 아닌 문자들을 의미함.
            $host = $matches[1];
            print_r($matches);
            preg_match('/[^.]+\.[^.]+$/', $host, $matches);
            //[.] : 대괄호 안에 들어가면 임의의 문자가 아닌 일반 .을 의미함
            //\. : 애니 캐릭터 .이 아닌 일반 문자 .을 의미함
            //$ : 맨 뒤에서 계산을 하며(오른쪽에서 계산을 하며), 맨 뒤를 기점으로 오른쪽에서 왼쪽 정규 표현식을 따라간다.
            echo "domain name is : {$matches[0]}\n"
        ?>

        <?php
            echo "</br></br>";
            $str= 'foobar: 2008';

            preg_match('/(?P<name>\w+): (?P<digit>\d+)/', $str, $matches2);
            //?P<이름> : 각 서브 패턴의 키값 - 백 레퍼런스라고 한다.
            //\d : 숫자.
            print_r($matches2);
            //[name]:foobar, [1]: foobar, [digit]:2008, [2]:2008 이란 형태로 나옴.
        ?>

        <?php
            echo "</br></br>";
            $string = 'April 15, 2003';
            $pattern = '/(\w+) (\d+), (\d+)/i';
            $replacement = '${1}1, $3';
            //$서브패턴 번호
            //${1}1은 (서브패턴1)문자1 이라는 뜻이 된다.

            echo preg_replace($pattern, $replacement, $string);
        ?>

        <?php
            echo "</br></br>";
            $string2 = "The quick brown fox jumped over the lazy dog.";
            $pattern2 = array();
            $pattern2[0] = '/quick/';
            $pattern2[1] = '/brown/';
            $pattern2[2] = '/fox/';

            $replacement2 = array();
            $replacement2[1] = 'slow';
            $replacement2[0] = 'black';
            $replacement2[2] = 'bear';

            echo preg_replace($pattern2, $replacement2, $string2);

            //$replacement2의 인덱스 값을 마구잡이로 넣어도 문제 없이 되는 이유는 
            //php에서는 인덱스의 값에 따라 치환을 하지 않고, 배열의 값이 생성된 순서대로 치환을 하기 때문에,
            //$pattern2[0]의 값은 $replacement[1] 이 된다.
        ?>

        <?php
            print "</br></br>";
            $pattern3 = array(
                '/(19|20)(\d{2})-(\d{1,2})-(\d{1,2})/',
                //(19|20) : 19또는 20, \d{2} : 두자리 숫자, \d{1,2} :한자리 이상 2자리 이하의 숫자.
                '/^\s*{(\w+)}\s*=/'
                //^\s* : 맨 앞(^)에 공백(\s)이 있을수도 없을수도 있다.(*)
                //(\w+) : 
            );

            $replacement3 = array('\3/\4/\1\2', '$\1 =');
            //$1 과 \1은 동일한 서브 배열값을 의미한다.

            echo preg_replace($pattern3, $replacement3, '{startDate} = 1999-5-27');
        ?>
    </body>
    
</html>