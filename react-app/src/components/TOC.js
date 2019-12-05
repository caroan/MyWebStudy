import React, {Component} from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps, newState){ //반환값이 참이면 render를 호출하고 거짓이면 render를 호출하지 않는다.
      console.log('TOC shouldComponentUpdate call');

      //기존 프롭스 나 스테이트와 현재 프롭스와 스테이트를 접근 가능하다.
      if(this.props.data === newProps.data){
        return false;
      }
      return true;
      //App.js에서 푸시를 안쓰고 콘캣을 쓰는 이유는 푸시를 쓰면 이전 프롭스와 현재 프롭스가 같은 값이 나오기 때문에 서로 비교를 할 수 없기 때문에 콘캣을 사용한다.
    }
    render(){
      console.log('TOC render call');

      var lists = [];
      var data = this.props.data;
      var i =0;
      while(i < data.length){
      lists.push(
        <li key={data[i].id}>
          <a
            href={"/content/"+data[i].id}
            data-mid = {data[i].id} //-으로 해야지 dataset에 들어갈 수 있습니다.
            onClick= {function(event){
              event.preventDefault();
              this.props.onChangePage(event.target.dataset.mid);
            }.bind(this)} //방법1 : 속성을 이용하여 모드 값을 바꾼다.
            // onClick= {function(id, event){
            //     event.preventDefault();
            //     this.props.onChangePage(id);
            //   }.bind(this, data[i].id)}//방법2 : 바인드값을 수정하여 인자를 수정하고 이를 적용한다.
            >{data[i].title}</a>
        </li>);
        i += 1;
      }
  
      return (//컴포넌트를 만들 때는 하나의 최상위 태그로 시작해야 한다.
        <nav>
          <ul>
            {lists}
          </ul>
        </nav>
      );
    }
  }

  export default TOC;