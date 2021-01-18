import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Store from './store';
import { getUserList, addUserItem } from '../../../Api';
import './style.scss';

//import { atan2, chain, derivative, format, e, evaluate, log, pi, pow, round, sqrt } from 'mathjs';

import math from '../../../../utils/math';

// import * as math from 'mathjs';

// math.config({
//   number: 'BigNumber',
//   precision: 64,
// });

@observer
class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = Store.getInstance();
    this.fishData = this.store.fishData;

    console.log(math.round(1.2366, 3)); // 1.237

    const num1 = math.evaluate('0.2 * 0.11');

    console.log(num1);

    console.log(math.format(math.evaluate('0.2 * 0.1'), { precision: 14 })); // '0.2'

    const num = math.chain(3).add(4).multiply(2).subtract(4).divide(2).done(); // 5
    console.log('num', num);
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
        </div>
      </div>
    );
  }
}

export default TestComponent;
