var M = {
    v:'v',
    f:function(){
        console.log(this.v);
    }
}

module.exports = M; //M이 가르키는 객체를 이 파일 바깥에서 사용할 수 있게 해준다.