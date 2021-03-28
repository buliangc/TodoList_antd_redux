import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoList from './TodoList.js';
import 'antd/dist/antd.css'; 


ReactDOM.render(
  <React.StrictMode>
    <TodoList />
  </React.StrictMode>,
  document.getElementById('root')
);
