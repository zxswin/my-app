import React, { Component } from 'react';

class SelectInput extends Component {
  render() {
    const { selectItem, placeholder, onClickHeader } = this.props;
    const { value } = selectItem;
    return (
      <div onClick={onClickHeader}>
        <input type="text" disabled placeholder={placeholder} />
      </div>
    );
  }
}

export default SelectInput;
