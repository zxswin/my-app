import React, { Component } from 'react';

class SelectInput extends Component {
  render() {
    const { selectItem, placeholder, onClickHeader } = this.props;
    const { value } = selectItem;
    return (
      <div onClick={onClickHeader}>
        <input
          value={value}
          type="text"
          onChange={() => {}}
          disabled
          placeholder={placeholder}
        />
      </div>
    );
  }
}

export default SelectInput;
