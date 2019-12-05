import React, {Component} from "react";

class CreateContent
 extends Component{
    render(){
      return (
        <article>
          <h2>Create</h2>
          <form action="/create_process" method="post" onSubmit={function(event){
            //submit 버튼 누르면 실행된다.
            event.preventDefault();
            this.props.onSubmit(event.target.title.value, event.target.desc.value);
          }.bind(this)}>
            <p><input type="text" name="title" placeholder="title"></input></p>
            <p>
              <textarea name="desc" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit"></input>
            </p>
          </form>
        </article>
      );
    }
  }

  export default CreateContent;