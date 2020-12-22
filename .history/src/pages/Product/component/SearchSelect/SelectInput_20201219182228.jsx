import React, { Component } from 'react';

class SelectInput extends Component {
  render() {
    const { selectItem, placeholder, onClickHeader } = this.props;
    const { value } = selectItem;
    return (
      <div>
        <input value={value} type="text" onChange={() => {}} />
      </div>
    );
  }
}

export default SelectInput;
