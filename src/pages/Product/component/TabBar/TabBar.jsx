import React, { Component } from 'react';
import TabNav from './TabNav';
import TabContent from './TabContent';

class TabBar extends Component {
  constructor(props) {
    super(props);
    const { defaultOrder } = this.props;
    this.state = {
      activeOrder: defaultOrder,
      currentPanel: <div></div>,
    };
  }

  componentDidMount() {
    const { defaultOrder } = this.props;
    this.setCurrentPanel(defaultOrder);
  }

  // 根据order设置对于的tabPanel
  setCurrentPanel(order) {
    const tabPanels = this.props.children;
    const currentPanel = tabPanels.find(tabPanel => tabPanel.props.order === order);

    this.setState({
      activeOrder: order,
      currentPanel,
    });
  }

  // 切换tab页事件
  onChangeTabs = order => {
    if (this.state.activeOrder === order) return;
    this.setCurrentPanel(order);
  };

  render() {
    const { children } = this.props;
    const { activeOrder, currentPanel } = this.state;

    return (
      <div className="tab-bar">
        <TabNav panels={children} activeOrder={activeOrder} onChangeTabs={this.onChangeTabs} />
        <TabContent currentPanel={currentPanel} />
      </div>
    );
  }
}

export default TabBar;
