import React, { Component } from 'react';
import './style.scss';

class TabNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { panels, activeOrder, onChangeTabs } = this.props;
    return (
      <div className="tab-nav">
        <ul>
          {panels.map(tabPanel => {
            const tabPanelProps = tabPanel.props;
            return (
              <li
                className={activeOrder === tabPanelProps.order ? 'active' : ''}
                key={`${tabPanelProps.order}-${tabPanelProps.tab}`}
                onClick={() => onChangeTabs(tabPanelProps.order)}
              >
                {tabPanelProps.tab}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TabNav;
