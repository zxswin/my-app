import './App.css';
import Alert from './Alert';
import { Component } from 'react';

function App() {
  const alertHandle = () => {
    console.log('点击了弹出提示框按钮！');
  };

  return (
    <div className="App">
      <p>开始了</p>
      <button onClick={this.alertHandle}>弹出提示框</button>
    </div>
  );
}

export default App;
