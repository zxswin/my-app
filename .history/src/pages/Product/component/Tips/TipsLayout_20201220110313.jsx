import React, { Component } from 'react';

const TipsLayout = (WrapComponent) => {
  return class extends Component {
    render() {
      return (
        <div className="tip-container">
          <h2>提示组件的标题</h2>
          <div className="tip-content">
            <WrapComponent />
          </div>
        </div>
      );
    }
  };
};

export default TipsLayout;
