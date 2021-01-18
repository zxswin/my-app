import React, { Component } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import Store from '../../store/login';
import { userLogin } from '../Api/index';
import './style.scss';

@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.store = Store.getInstance();
  }

  @action
  loginBtnClick = async () => {
    const { login } = this.store;
    const { username, password } = this.state;

    console.log('login props', login, this.props, username, password);

    const loginRes = await userLogin(username, password);
    const loginMsg = loginRes.data.errmsg;

    console.log('loginRes', loginRes);

    if (!loginMsg) {
      // 登录成功
      login.isLogin = true;
      login.loginInfo = '';

      // 把登录状态写入到缓存中
      sessionStorage.setItem('isLogin', true);

      // 进行路由跳转
      this.props.history.push({
        pathname: '/home',
        state: { isLogin: login.isLogin },
      });
    } else {
      // 登录失败
      login.loginInfo = loginMsg;
      sessionStorage.setItem('isLogin', '');
    }
  };

  // 改变用户名
  onChangeUsername = e => {
    const value = e.currentTarget.value;
    this.setState({
      username: value,
    });
  };

  // 改变密码
  onChangePassword = e => {
    const value = e.currentTarget.value;
    this.setState({
      password: value,
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="Login">
        <div className="login-content">
          <label>
            用户名
            <input value={username} onChange={this.onChangeUsername} />
          </label>
          <label>
            密码
            <input value={password} onChange={this.onChangePassword} />
          </label>
          <button onClick={this.loginBtnClick}>登陆</button>
        </div>
      </div>
    );
  }
}

export default Login;
