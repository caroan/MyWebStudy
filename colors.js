//1.html에서 사용 중.
//분할된 파일은 캐쉬 메모리에 들어가기 때문에 상당히 효율적이다.
var Links ={
    setColor:function(myColor){
        var alist = document.querySelectorAll('a');
        var i =0;
        while(i<alist.length){
            alist[i].style.color=myColor;
            i++;
        }
    }
}
var Body = {
    setColor:function(color){
      document.querySelector('body').style.color = color;  
    },
    setBackGroundColor:function(color){
      document.querySelector('body').style.backgroundColor = color;
    }
}

function nightDayhandler(self){
    var target = document.querySelector('body');
    if (self.value === 'night'){
      Body.setBackGroundColor('black')
      Body.setColor('white')
      self.value = 'day';
      Links.setColor('powderblue');
    }
    else{
      Body.setBackGroundColor('white')
      Body.setColor('black')
      self.value = 'night';
      Links.setColor('red');
    }
}