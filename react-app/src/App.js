// import React from 'react';
// //import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       Hello, React!!!
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React!!
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, {Component} from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
//import logo from './logo.svg';
import './App.css';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props){ //생성자
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      Subject: {title: 'WEB', desc: 'World Wide Web'},
      welcome:{title: 'welcome!', desc: 'hello react!!!'},
      content:[
        {id:1, title:'HTML', desc:'html is hyper ....'},
        {id:2, title:'CSS', desc:'CSS is for design ....'},
        {id:3, title:'Javascript', desc:'javascript is language ....'}
      ]
    }
  }

  getReadContent(){
    var i = 0;
      while(i< this.state.content.length){
        var data = this.state.content[i];
        if(data.id === this.state.selected_content_id){
          return data;
        }
        i = i+1;
      }

      return null;
  }

  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome!'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    }
    else if(this.state.mode === 'read'){
      
      _article = <ReadContent title={this.getReadContent().title} desc={this.getReadContent().desc}></ReadContent>;
    }
    else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id += 1;
        // this.state.content.push({id:this.max_content_id, title:_title, desc:_desc});
        // this.setState({
        //   content:this.state.content
        // });
        var result = this.state.content.concat({ //<- 위 방식보다 이 방식이 더 좋음.(원복이 안바뀜)
          id:this.max_content_id, title:_title, desc:_desc
        });
        //푸시를 해야 한다면 아래와 같이 하면 된다.
        // var result = Array.from(this.state.content); 
        // result.push({id:this.max_content_id, title:_title, desc:_desc});
        //Array.from의 객체버전이 Object.assign() 이다.

        //아니면 원본을 일괄적으로 놔두고 싶다면 var map = Immutable.Map({id: 1, text: 'text'});와 같은 것을 사용해보도록 하자.

        this.setState({content: result, mode: 'read', selected_content_id: this.max_content_id});
      }.bind(this)}></CreateContent>;
    }
    else if(this.state.mode === 'update'){
      var _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
        var _content = Array.from(this.state.content);
        var i = 0;
        while(i< _content.length){
          if(_content[i].id === _id){
            _content[i] = {id: _id, title: _title, desc: _desc}
            break;
          }
          i += 1;
        }
        this.setState({content: _content, mode: 'read'});
      }.bind(this)}></UpdateContent>;
    }

    return _article;
  }
  render(){//state와 props 값이 변경되면 render를 다시 호출한다.
    return (
      <div className="App">
        <Subject
        title={this.state.Subject.title}
        desc={this.state.Subject.desc}
        onChangePage={function(){
          this.setState({mode: 'welcome!'});
        }.bind(this)}
        // onClick={function(event){
        //   event.preventDefault(); //이벤트의 기본적인 동작방법을 금지시킨다. 이렇게 하면 클릭할 때마다 페이지가 전환되지 않는다.
        //   this.setState({ // 스테이트를 바꾸러면 이렇게 해야 한다.
        //     mode: 'welcome'
        //   });
        // }.bind(this)}
        ></Subject>
        {/* <Subject title="React" desc="facebook make this language for ui"></Subject> */}
        <TOC onChangePage={function(id){
          this.setState({
            mode:"read",
            selected_content_id: Number(id)
          });
        }.bind(this)} data={this.state.content}></TOC>
        
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('지우시겠습니까?')){
              var _content = Array.from(this.state.content);
              var i = 0;

              while(i< _content.length){
                if(_content[i].id === this.state.selected_content_id){
                  _content.splice(i, 1);
                  break;
                }
                i += 1;
              }
            }

            this.setState({
              content: _content,
              mode: 'welcome'
            });
            alert('deleted');
          }
          else{
            this.setState({
              mode: _mode
            });
          }
          this.setState({mode: _mode});
        }.bind(this)}></Control>
        
        {this.getContent()}
      </div>
    );
  }
}

export default App;