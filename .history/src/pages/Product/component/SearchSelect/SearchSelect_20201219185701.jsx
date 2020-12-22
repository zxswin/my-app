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

  // 包装SelectInput组件的高阶组件
  WithSelectInput = (SelectInput) => {
    const onClikcHeader = () => {
      console.log('头部被点击了');
    };
    const placeholder = '请选择';

    return class extends Component {
      render() {
        const newProps = {
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
      const data = dataList.filter((item) => item.text.includes(value));
      console.log('搜索框的值改变了');
      this.setState({ serchValue: value, data });
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
    const onSelect = (item) => {
      console.log('选中了某一项', item);
      this.setState({
        selectItem: item,
      });
    };
    return class extends Component {
      render() {
        const newProps = {
          onSelect: onSelect,
        };
        return <List {...this.props} {...newProps} />;
      }
    };
  };

  HOCSelectInput = this.WithSelectInput(SelectInput);
  HOCSearchInput = this.WithSearchInput(SearchInput);
  HOCList = this.WithList(List);

  render() {
    const { serchValue, data, selectItem } = this.state;
    return (
      <div>
        <this.HOCSelectInput selectItem={selectItem} />
        <this.HOCSearchInput value={serchValue} />
        <this.HOCList data={data} />
      </div>
    );
  }
}

export default SearchSelect;
