import React from 'react';
import ReactDOM from 'react-dom';

class Alert extends React.Component {
  render() {
    return (
      <div className="alert-box">
        <p>alert 组件</p>
      </div>
    );
  }
}

let div = document.createElement('div');
let props = {};

document.body.appendChild(div);

let Box = ReactDOM.render(React.createElement(Alert, props), div);

export default Box;
