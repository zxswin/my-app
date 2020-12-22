import React, { Component } from 'react';
import TipsLayout from '../../component/Tips/TipsLayout';
import TipContentA from '../../component/Tips/TipContentA';
import TipContentB from '../../component/Tips/TipContentB';
import './fishs.scss';

const TipA = TipsLayout(TipContentA);
const TipB = TipsLayout(TipContentB);

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
          <TipA />
          <TipB />
        </div>
      </div>
    );
  }
}

export default Fishs;
