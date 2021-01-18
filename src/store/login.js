import { observable } from 'mobx';

class LoginData {
  static instance;
  static getInstance = () => {
    if (!LoginData.instance) {
      LoginData.instance = new LoginData();
    }

    return LoginData.instance;
  };

  @observable login = {
    isLogin: false, // 是否已经登录
    loginInfo: '', // 登录信息
  };
}

export default LoginData;
