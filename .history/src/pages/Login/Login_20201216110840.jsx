import React, { Component } from 'react';
import './login.scss';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  loginBtnClick = () => {
    console.log('login props', this.props);
    this.props.history.push({
      pathname: '/home',
      state: { info: '从登陆界面跳转过来' },
    });
  };
  render() {
    return (
      <div className="Login">
        <div className="login-content">
          <label>
            用户名
            <input value="" onChange={() => {}} />
          </label>
          <label>
            密码
            <input value="" onChange={() => {}} />
          </label>
          <button onClick={this.loginBtnClick}>登陆</button>
        </div>
      </div>
    );
  }
}

export default Login;
