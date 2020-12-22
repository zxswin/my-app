import React, { Component } from 'react';
import TarBar from '../../component/TabBar/TabBar';
import TabPanel from '../../component/TabBar/TabPane';
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
          <TarBar>
            <TabPanel order="0" tab="tab标题1">
              tab-panel 内容1
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
