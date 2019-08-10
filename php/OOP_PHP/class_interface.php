<?php
    interface ContractInterface{
        public function promiseMethod($param);
        //파라미터의 형식, 리턴값 형식을 정해줘야 한다.(:int <- 리턴값의 형식 정하기)
        //파라미터의 형식은 반드시 정해줘야 할 필요는 없다. 대신 형식을 정해줬을 경우 이를 받는 쪽에서는 해당 형식을 아래와 같이 선언해야 한다.
        //리턴값도 반드시 정해줘야 할 필요가 없다. 대신 정해준 경우 정해준 형식을 온전히 따라야 한다.
    }
    interface ContractInterface2{
        public function promiseMethod2(array $param):int;
    }

    class ConcreateClass implements ContractInterface, ContractInterface2{
        public function promiseMethod($param):int{
            return 1;
        }

        public function promiseMethod2(array $param):int{
            return 2;
        }
    }

    $obj = new ConcreateClass();
    echo $obj->promiseMethod([1,2]);
    echo $obj->promiseMethod2([1,2]);
?>