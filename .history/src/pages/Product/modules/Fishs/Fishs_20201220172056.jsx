import React, { Component } from 'react';
import './fishs.scss';

import axios from 'axios';

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  // 查询用户列表
  queryUserList = () => {
    axios
      .get('http://localhost:7001/users/list?pageStart=1&pageSize=10')
      .then((res) => {
        console.log('从接口中获取到的结果', res);
      });
  };

  // 新增用户
  addUser = () => {
    axios
      .post('http://localhost:7001//users/add', {
        username: 'xiaoming',
        /** 密码  */
        password: 123456,

        email: '1577820766@qq.com',

        role_id: 1,
      })
      .then((res) => {
        console.log('接口返回的新增用户结果', res);
      });
  };

  render() {
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <button type="button" onClick={this.addUser}>
            新增用户
          </button>
          <button type="button" onClick={this.queryUserList}>
            查询用户
          </button>
        </div>
      </div>
    );
  }
}

export default Fishs;
