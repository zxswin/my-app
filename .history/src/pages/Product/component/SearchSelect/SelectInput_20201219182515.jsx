import React, { Component } from 'react';

class SelectInput extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <input value={value} type="text" onChange={() => {}} />
      </div>
    );
  }
}

export default SelectInput;
