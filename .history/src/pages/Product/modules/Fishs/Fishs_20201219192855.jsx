import React, { Component } from 'react';
import SearchSelect from '../../component/SearchSelect/SearchSelect';
import './fishs.scss';

const dataList = [
  { text: '北京人', value: '1' },
  { text: '上海', value: '2' },
  { text: '广州人', value: '3' },
  { text: '深圳', value: '4' },
  { text: '杭州人', value: '5' },
];

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <div className="checked_box">
            <SearchSelect dataList={dataList} />
          </div>
        </div>
      </div>
    );
  }
}

export default Fishs;
