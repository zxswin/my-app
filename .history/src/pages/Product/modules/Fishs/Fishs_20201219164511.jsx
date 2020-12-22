import React, { Component } from 'react';
import SearchSelect from '../../component/SearchSelect/SearchSelect';
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
          <div className="checked_box">
            <SearchSelect />
          </div>
        </div>
      </div>
    );
  }
}

export default Fishs;
