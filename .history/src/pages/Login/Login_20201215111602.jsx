import React, { Component } from 'react';
import styles from './login.module.scss';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  loginBtnClick = () => {};
  render() {
    return (
      <div className={styles.Login}>
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
