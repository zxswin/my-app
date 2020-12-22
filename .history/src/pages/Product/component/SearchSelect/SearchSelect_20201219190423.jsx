import React, { Component } from 'react';
import SelectInput from './SelectInput';
import SearchInput from './SearchInput';
import List from './List';

const dataList = [
  { text: '北京人', value: '1' },
  { text: '上海', value: '2' },
  { text: '广州人', value: '3' },
  { text: '深圳', value: '4' },
  { text: '杭州人', value: '5' },
];

class SearchSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serchValue: '',
      data: dataList,
      selectItem: {
        value: '',
        text: '',
      },
    };
  }

  onClickHeader = () => {
    console.log('点击了头部');
  };

  onSearchChange = () => {
    console.log('搜索词改变了');
  };

  render() {
    const { serchValue, data, selectItem } = this.state;
    return (
      <div>
        <SelectInput
          selectItem={selectItem}
          placeholder="请选择"
          onClickHeader={this.onClickHeader}
        />
        <SearchInput value={serchValue} onSearchChange={this.onSearchChange} />
        <List />
      </div>
    );
  }
}

export default SearchSelect;
