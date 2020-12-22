import React, { Component } from 'react';
import SelectInput from './SelectInput';

class SearchSelect extends Component {
  WithSelectInput = (SelectInput) => {
    const onClikcHeader = () => {};
    const selectItem = { text: '123456' };
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

  render() {
    return (
      <div>
        <this.WithSelectInput />
      </div>
    );
  }
}

export default SearchSelect;
