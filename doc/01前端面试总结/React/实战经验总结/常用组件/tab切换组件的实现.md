## tab 切换组件的实现

- TabPanel.jsx

```tsx
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
```

- TabNav.jsx

```tsx
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
          {panels.map((tabPanel) => {
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
```

- TabContent

```tsx
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
```

- TabBar.jsx

```tsx
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
    const currentPanel = tabPanels.find(
      (tabPanel) => tabPanel.props.order === order
    );

    this.setState({
      activeOrder: order,
      currentPanel,
    });
  }

  // 切换tab页事件
  onChangeTabs = (order) => {
    if (this.state.activeOrder === order) return;
    this.setCurrentPanel(order);
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
```

- 使用

```tsx
import React, { Component } from 'react';
import TarBar from '../../component/TabBar/TabBar';
import TabPanel from '../../component/TabBar/TabPanel';
import './fishs.scss';

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <TarBar defaultOrder="1">
            <TabPanel order="0" tab="tab标题1">
              <div className="tab1">
                <p>这是tab-panel 内容1</p>
              </div>
            </TabPanel>
            <TabPanel order="1" tab="tab标题2">
              tab-panel 内容2
            </TabPanel>
            <TabPanel order="2" tab="tab标题3">
              tab-panel 内容3
            </TabPanel>
            <TabPanel order="3" tab="tab标题4">
              tab-panel 内容4
            </TabPanel>
          </TarBar>
        </div>
      </div>
    );
  }
}

export default Fishs;
```
