import React, { Component } from 'react';

class SearchInput extends Component {
  render() {
    const { value, onSearchChange } = this.props;
    return (
      <div>
        <input value={value} type="text" onChange={onSearchChange} />
      </div>
    );
  }
}

export default SearchInput;
