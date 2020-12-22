import React, { Component } from 'react';
import TabNav from './TabNav';
import TabContent from './TabContent';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;

    return (
      <div className="tab-bar">
        <TabNav panels={children} />
        <TabContent />
      </div>
    );
  }
}

export default TabBar;
