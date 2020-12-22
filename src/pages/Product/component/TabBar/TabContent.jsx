import React, { Component } from 'react';

class TabContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentPanel } = this.props;
    return (
      <div className="tab-content">
        <div className="tab-container">{currentPanel}</div>
      </div>
    );
  }
}

export default TabContent;
