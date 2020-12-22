import React, { Component } from 'react';

class TabContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="tab-content">
        <div className="tab-container">内容1</div>
      </div>
    );
  }
}

export default TabContent;
