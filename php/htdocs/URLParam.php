<!Doctype html>
<html>
    <head>
    </head>
    <body>
        <!-- 아래의 것을 주소창에 127.0.0.1:8080/URLParam.php?name=AMS&address=seoul 라고 하면 '안녕 seoul에서 오신 AMS 아 오랜만이야가 나온다.' -->
        <!-- URL로 입력값을 준다는 것. 밑에서 []는 배열을 의미한다. -->
        <!-- &는 엠퍼센드라고 한다. 입력값을 계속 추가하고 싶으면 엠퍼센드를 계속 추가하면 된다.-->
        <!-- 위 주소 입력법은 PHP와 상관없이 그냥 공통으로 사용하는 것이다. -->
        안녕? <?php echo $_GET['address'];?>에서 오신 <?php echo $_GET['name'];?> 아 오랜만이야.
    </body>
</html>