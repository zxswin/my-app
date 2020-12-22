import React, { Component } from 'react';
import './fishs.scss';

class Fishs extends Component {
  // 点击按钮获取用户名
  getUserName = () => {
    const usernameRef = this.refs.username;

    console.log(usernameRef.value);
  };

  render() {
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <input ref="username" type="text" defaultValue="用户名" />
          <button type="button" onChange={this.getUserName}>
            获取用户名
          </button>
        </div>
      </div>
    );
  }
}

export default Fishs;
