import React, { Component } from 'react';

class SelectInput extends Component {
  render() {
    const { selectItem, placeholder, onClickHeader } = this.props;
    const { text } = selectItem;
    return (
      <div onClick={onClickHeader}>
        <input
          value={text}
          type="text"
          placeholder={placeholder}
          onChange={() => {}}
        />
      </div>
    );
  }
}

export default SelectInput;
