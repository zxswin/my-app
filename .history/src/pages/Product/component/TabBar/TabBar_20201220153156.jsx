import React, { Component } from 'react';
import TabNav from './TabNav';
import TabContent from './TabContent';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="tab-bar">
        <TabNav />
        <TabContent />
      </div>
    );
  }
}

export default TabBar;
