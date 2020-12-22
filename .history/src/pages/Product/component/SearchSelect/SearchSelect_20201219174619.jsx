import React, { Component } from 'react';
import SelectInput from './SelectInput';
import SearchInput from './SearchInput';

class SearchSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serchValue: '',
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

  HOCSelectInput = this.WithSelectInput(SelectInput);
  HOCSearchInput = this.WithSearchInput(SearchInput);

  render() {
    const { serchValue } = this.state;
    return (
      <div>
        <this.HOCSelectInput />
        <this.HOCSearchInput value={serchValue} />
      </div>
    );
  }
}

export default SearchSelect;
