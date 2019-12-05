import React, {Component} from "react";

class Control extends Component {//무조건 대문자로 만들어야 한다.
    render(){
      return (
        <ul>
          <li><a href="/create" onClick={function(event){
              event.preventDefault();
              this.props.onChangeMode('create');
          }.bind(this)}>create</a></li>
          <li><a href="/update" onClick={function(event){
              event.preventDefault();
              this.props.onChangeMode('update');
          }.bind(this)}>update</a></li>
          <li><input type="button" value="delete" onClick={function(event){
              event.preventDefault();
              this.props.onChangeMode('delete');
          }.bind(this)}></input></li>
        </ul>
      );
    }
  }

  export default Control;