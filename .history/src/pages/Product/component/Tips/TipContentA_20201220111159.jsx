import React, { Component } from 'react';
import TipsLayout from './TipsLayout';
class TipContentA extends Component {
  render() {
    return (
      <div className="TipContentA">
        <div>提示内容A</div>
      </div>
    );
  }
}

export default TipsLayout(TipContentA);
