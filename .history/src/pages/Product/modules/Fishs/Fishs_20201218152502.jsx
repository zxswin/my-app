import React, { Component } from 'react';
import './fishs.scss';

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // 创建一个ref对象
    this.usernameRef = React.createRef();
  }

  // 一个用户名输入框组件
  UsernameInput = React.forwardRef((props, ref) => {
    <input ref={ref} {...props} />;
  });

  // 点击按钮获取用户名
  getUserName = () => {
    // 通过ref获取控件的值
    const username = this.usernameRef.current.value;
    console.log('username', username);
  };

  render() {
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <this.UsernameInput
            ref={this.usernameRef}
            type="text"
            defaultValue="用户名"
            placeholder="请输入用户名"
          />
          <button type="button" onClick={this.getUserName}>
            获取用户名
          </button>
        </div>
      </div>
    );
  }
}

export default Fishs;
