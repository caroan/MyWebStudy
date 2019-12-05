import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; //무조건 대문자로 시작해야 한다.
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
