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
      showDown: false,
    };
    this.searchInput = React.createRef();
  }

  onClickHeader = () => {
    console.log('点击了头部', this.searchInput.current);
    this.setState({ showDown: true });
    // 在一开始搜索框隐藏的状态下是获取不到搜索输入框的所以下面代码会报错
    // this.searchInput.current.focus();
  };

  onSearchChange = (event) => {
    const value = event.currentTarget.value;
    console.log('搜索词改变了', value);
    const data = dataList.filter((item) => item.text.includes(value));
    this.setState({ serchValue: value, data });
  };

  onSearchBlur = () => {
    this.setState({ showDown: false });
  };

  onSelect = (item) => {
    console.log('选择了某一项', item);
    this.setState({ selectItem: item, showDown: false });
  };

  render() {
    const { serchValue, data, selectItem, showDown } = this.state;
    return (
      <div>
        <SelectInput
          selectItem={selectItem}
          placeholder="请选择"
          onClickHeader={this.onClickHeader}
        />

        {showDown && (
          <div className="show_data">
            <SearchInput
              ref={this.searchInput}
              value={serchValue}
              onSearchChange={this.onSearchChange}
              onSearchBlur={this.onSearchBlur}
            />
            <List data={data} onSelect={this.onSelect} />
          </div>
        )}
      </div>
    );
  }
}

export default SearchSelect;
