import React, { Component } from 'react';
import './fishs.scss';

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.usernameRef = React.createRef();
  }
  // 点击按钮获取用户名
  getUserName = () => {
    const username = this.usernameRef.current.value;

    console.log('username', username);
  };

  render() {
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <input value="" onChange={()=>{]}} type="text" defaultValue="用户名" />
          <button type="button" onClick={this.getUserName}>
            获取用户名
          </button>
        </div>
      </div>
    );
  }
}

export default Fishs;
