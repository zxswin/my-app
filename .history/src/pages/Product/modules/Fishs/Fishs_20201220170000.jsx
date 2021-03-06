import React, { Component } from 'react';
import TarBar from '../../component/TabBar/TabBar';
import TabPanel from '../../component/TabBar/TabPanel';
import './fishs.scss';

import axios from 'axios';

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get('http://localhost:7001/users/list?pageStart=1&pageSize=10')
      .then((res) => {
        console.log('从接口中获取到的结果', res);
      });
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
