import React, { Component } from 'react';

class TabPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return <div className="tab-panel">{children}</div>;
  }
}

export default TabPanel;
