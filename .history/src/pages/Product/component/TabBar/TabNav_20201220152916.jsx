import React, { Component } from 'react';

class TabNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="tab-nav">
        <ul>
          <li>tab1</li>
          <li>tab2</li>
          <li>tab3</li>
          <li>tab4</li>
        </ul>
      </div>
    );
  }
}

export default TabNav;
