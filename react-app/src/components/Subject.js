import React, {Component} from "react";

class Subject extends Component {//무조건 대문자로 만들어야 한다.
    render(){//functon을 생략한다.
      return (//컴포넌트를 만들 때는 하나의 최상위 태그로 시작해야 한다.
        <header>
          <h1><a href="/" onClick={
            function(event){
              event.preventDefault();
              this.props.onChangePage(); //prop으로 함수를 전달받아 실행한다.
            }.bind(this)
          }>{this.props.title}</a></h1>
          <h2>{this.props.desc}</h2>
        </header>
      );
    }
  }

  export default Subject;