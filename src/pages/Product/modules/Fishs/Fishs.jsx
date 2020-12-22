import React, { Component } from 'react';
import { getUserList, addUserItem } from '../../../Api';
import './fishs.scss';

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  // 查询用户列表
  queryUserList = async () => {
    const testData = [1, 2, 3, 4];

    const data = await getUserList();
    console.log('获取到的数据888', data, testData);
  };

  // 新增用户
  addUser = async () => {
    const data = await addUserItem();
    console.log('调用新增接口返回的数据', data);
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
