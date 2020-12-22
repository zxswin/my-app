import React, { Component } from 'react';

const decritorFn = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <React.Fragment>
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

export default decritorFn(HOCcomponent);
