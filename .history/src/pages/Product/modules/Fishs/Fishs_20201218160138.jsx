import React, { Component } from 'react';
import './fishs.scss';

class UsernameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.inputRef = React.createRef();
  }

  // 子组件中定义类一个公用的方法
  showInputValue() {
    const value = this.inputRef.current.value;
    console.log('当前控件是输入值是', value);
  }

  render() {
    return (
      <React.Fragment>
        <input
          ref={this.inputRef}
          type="text"
          defaultValue="用户名"
          placeholder="请输入用户名"
        />
      </React.Fragment>
    );
  }
}

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // 创建一个ref对象
    this.usernameRef = React.createRef();
  }

  // 点击按钮获取用户名
  getUserName = () => {
    // 通过ref获取控件的值
    const sunComponent = this.usernameRef.current;
    console.log('sunComponent', sunComponent);
  };

  render() {
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <UsernameInput ref={this.usernameRef} />
          <button type="button" onClick={this.getUserName}>
            获取用户名
          </button>
        </div>
      </div>
    );
  }
}

export default Fishs;
