import React, { Component } from 'react';

const Mycontainer = (WrappedComponent) => {
  return class extends Component {
    // 通过ref获取包装组件的实例
    proc = (WrappedComponentInstance) => {
      console.log('获取到包装组件的实例', WrappedComponentInstance);
    };
    render() {
      // 需要添加给包装组件的新特性
      const newProps = {
        name: '包装组件的名称',
        data: [1, 2, 3, 4],
        ref: this.proc,
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
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="HOCcomponent">
        <div>高阶组件</div>
      </div>
    );
  }
}

export default Mycontainer(HOCcomponent);
