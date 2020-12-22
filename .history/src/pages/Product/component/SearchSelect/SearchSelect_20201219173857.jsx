import React, { Component } from 'react';
import SelectInput from './SelectInput';
import SearchInput from './SearchInput';

class SearchSelect extends Component {
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
    const value = '';
    const onChange = () => {
      console.log('搜索框的值改变了');
    };
    return class extends Component {
      render() {
        const newProps = {
          value,
          onChange,
        };
        return <SearchInput {...this.props} {...newProps} />;
      }
    };
  };

  render() {
    const WithSelectInput = this.WithSelectInput(SelectInput);
    const WithSearchInput = this.WithSearchInput(SearchInput);
    return (
      <div>
        <WithSelectInput />
        <WithSearchInput />
      </div>
    );
  }
}

export default SearchSelect;
