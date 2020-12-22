import React, { Component } from 'react';

const Mycontainer = (WrappedComponent) => {
  return class extends Component {
    render() {
      // 需要添加给包装组件的新特性
      const newProps = {
        name: '包装组件的名称',
        data: [1, 2, 3, 4],
      };
      return (
        <React.Fragment>
          <div>通过高阶组件包装过了</div>
          <WrappedComponent {...this.props} {...newProps} />
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
