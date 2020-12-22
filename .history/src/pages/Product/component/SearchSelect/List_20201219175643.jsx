import React, { Component } from 'react';

class List extends Component {
  render() {
    const { data, onSelect } = this.props;
    return (
      <ul>
        {data.map((item) => (
          <li
            key={item.text}
            onClick={() => {
              onSelect(item);
            }}
          >
            {item.text}
          </li>
        ))}
      </ul>
    );
  }
}

export default List;
