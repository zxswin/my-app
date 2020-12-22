import React, { Component } from 'react';

class TabNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { panels } = this.props;
    return (
      <div className="tab-nav">
        <ul>
          {panels.map((tabPanel) => (
            <li key={tabPanel.props.tab}>{tabPanel.props.tab}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TabNav;
