import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Store from './store';
import { getUserList, addUserItem } from '../../../Api';
import HOC from '../../component/HOCcomponent/HOCcomponent';
import Panel from 'components/Panel/Panel';
import './style.scss';

@observer
class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = Store.getInstance();
    this.fishData = this.store.fishData;
  }

  componentDidMount() {}

  // 查询用户列表
  queryUserList = async () => {
    const testData = [1, 2, 3, 4];

    const data = await getUserList();
    console.log('获取到的数据888999666', data, testData);
  };

  // 新增用户
  addUser = async () => {
    const data = await addUserItem();
    console.log('调用新增接口返回的数据', data);
  };

  // 改变mobx数据

  changeFishData = () => {
    this.store.setFishDate({ id: 1100011119999 });
  };

  render() {
    const fishData = this.fishData;
    return (
      <div className="Fishs">
        <div>鱼类中心{fishData.name}</div>
        <div className="fishs_content-input">
          <p>{fishData.id}</p>
          <button type="button" onClick={this.changeFishData}>
            改变fishid
          </button>

          <button type="button" onClick={this.addUser}>
            新增用户
          </button>
          <button type="button" onClick={this.queryUserList}>
            查询用户
          </button>
          <HOC />
          <Panel />
        </div>
      </div>
    );
  }
}

export default Fishs;
