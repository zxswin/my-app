import React, { Component } from 'react';
import SelectInput from './SelectInput';
import SearchInput from './SearchInput';
import List from './List';

const dataList = [
  { text: '北京', value: '1' },
  { text: '上海', value: '2' },
  { text: '广州', value: '3' },
  { text: '深圳', value: '4' },
  { text: '杭州', value: '5' },
];

class SearchSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serchValue: '',
      data: [],
    };
  }

  // 包装SelectInput组件的高阶组件
  WithSelectInput = (SelectInput) => {
    const onClikcHeader = () => {
      console.log('头部被点击了');
    };
    const selectItem = { value: '123456' };
    const placeholder = '请选择';

    return class extends Component {
      render() {
        const newProps = {
          selectItem,
          placeholder,
          onClikcHeader,
        };
        return <SelectInput {...this.props} {...newProps} />;
      }
    };
  };

  // 包装SearchInput组件的高阶组件
  WithSearchInput = (SearchInput) => {
    const onChange = (event) => {
      const value = event.currentTarget.value;
      console.log('搜索框的值改变了');
      this.setState({ serchValue: value });
    };
    return class extends Component {
      render() {
        const newProps = {
          onChange,
        };
        return <SearchInput {...this.props} {...newProps} />;
      }
    };
  };

  // 包装List的高阶组件
  WithList = (List) => {
    return class extends Component {
      onSelect = () => {
        console.log('选中了某一项');
      };
      render() {
        const newProps = {
          onSelect: this.onSelect,
        };
        return <List {...this.props} {...newProps} />;
      }
    };
  };

  HOCSelectInput = this.WithSelectInput(SelectInput);
  HOCSearchInput = this.WithSearchInput(SearchInput);
  HOCList = this.WithList(List);

  render() {
    const { serchValue, data } = this.state;
    return (
      <div>
        <this.HOCSelectInput />
        <this.HOCSearchInput value={serchValue} />
        <this.HOCList data={data} />
      </div>
    );
  }
}

export default SearchSelect;
