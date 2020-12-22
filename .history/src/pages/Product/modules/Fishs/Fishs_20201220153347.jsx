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
            <TabPanel />
            <TabPanel />
            <TabPanel />
            <TabPanel />
          </TarBar>
        </div>
      </div>
    );
  }
}

export default Fishs;
