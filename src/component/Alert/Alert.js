import React from 'react';
import ReactDOM from 'react-dom';
import styles from './alert.module.scss';

class Alert extends React.Component {
  show = () => {
    console.log('点击弹出组件');
  };
  render() {
    return (
      <div className={styles.Alert}>
        <p>alert 组件88</p>
      </div>
    );
  }
}

let div = document.createElement('div');
let props = {};

document.body.appendChild(div);
// 如果这么写Box将会返回null
// let Box = ReactDOM.render(Alert, div);
// 这么写会返回Alert组件的实例
let Box = ReactDOM.render(React.createElement(Alert, props), div);
console.log('alert组件加载了……');
export default Box;
