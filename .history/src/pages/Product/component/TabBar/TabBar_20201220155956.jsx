import React, { Component } from 'react';
import TabNav from './TabNav';
import TabContent from './TabContent';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOrder: '0',
      currentPanel: <div></div>,
    };
  }

  componentDidMount() {
    const { defaultOrder } = this.props;
  }

  // 根据order设置对于的tabPanel

  // 切换tab页事件
  onChangeTabs = (order) => {
    if (this.state.activeOrder === order) return;
    const tabPanels = this.props.children;
    const currentPanel = tabPanels.find((tabPanel) => tabPanel.order === order);
    this.setState({
      activeOrder: order,
      currentPanel,
    });
  };

  render() {
    const { children } = this.props;
    const { activeOrder, currentPanel } = this.state;

    return (
      <div className="tab-bar">
        <TabNav
          panels={children}
          activeOrder={activeOrder}
          onChangeTabs={this.onChangeTabs}
        />
        <TabContent currentPanel={currentPanel} />
      </div>
    );
  }
}

export default TabBar;
