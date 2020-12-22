import React, { Component } from 'react';
import TabNav from './TabNav';
import TabContent from './TabContent';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOrder: '0',
    };
  }

  // 切换tab页事件
  onChangeTabs = (order) => {
    if (this.state.activeOrder === order) return;
    this.setState({
      activeOrder: order,
    });
  };

  render() {
    const { children } = this.props;
    const { activeOrder } = this.state;

    return (
      <div className="tab-bar">
        <TabNav
          panels={children}
          activeOrder={activeOrder}
          onChangeTabs={this.onChangeTabs}
        />
        <TabContent />
      </div>
    );
  }
}

export default TabBar;
