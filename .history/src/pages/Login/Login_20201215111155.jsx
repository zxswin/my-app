import React, { Component } from 'react';
import styles from './login.module.scss';
class Login extends Component {
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
          <button>登陆</button>
        </div>
      </div>
    );
  }
}

export default Login;
