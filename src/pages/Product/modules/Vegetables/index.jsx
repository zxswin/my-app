import React, { Component } from 'react';
import Select from '../../../../components/Select';
import './style.scss';

class Vegetables extends Component {
  options = [
    { label: '选项1', value: '01' },
    { label: '选项2', value: '02' },
    { label: '选项3', value: '03' },
    { label: '选项4', value: '04' },
    { label: '选项5', value: '05' },
  ];
  constructor(props) {
    super(props);
    this.state = {
      select: this.options[0] || {},
    };
  }

  // 改变选项事件
  onSelectChange = item => {
    console.log('当前选中的选项', item);
    this.setState({
      select: item,
    });
  };

  render() {
    return (
      <div className="Vegetables">
        <div>蔬菜类中心</div>
        <div className="Vegetables__search-box">
          <Select select={this.state.select} options={this.options} onChange={this.onSelectChange} />
        </div>
        <div className="Vegetables__animation">{/* <TestAnimation /> */}</div>
      </div>
    );
  }
}

export default Vegetables;
