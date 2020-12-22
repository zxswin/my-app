import React, { Component } from 'react';

const Mycontainer = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <React.Fragment>
          <div>通过高阶组件包装过了</div>
          <WrappedComponent />
        </React.Fragment>
      );
    }
  };
};

class HOCcomponent extends Component {
  render() {
    return (
      <div className="HOCcomponent">
        <div>高阶组件</div>
      </div>
    );
  }
}

export default Mycontainer(HOCcomponent);
