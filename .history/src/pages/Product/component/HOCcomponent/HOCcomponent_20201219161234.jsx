import React, { Component } from 'react';

const Mycontainer = (WrappedComponent) => {
  return class extends WrappedComponent {
    render() {
      const elementsTree = super.render();
      let newProps = {};

      if (elementsTree && elementsTree.type === 'input') {
        newProps = {
          value: '经过高阶组件修改后的输入控件的值',
        };
      }
      const props = Object.assign({}, elementsTree.props, newProps);
      const newElementsTree = React.cloneElement(
        elementsTree,
        props,
        elementsTree.props.children
      );
      return newElementsTree;
    }
  };
};

class HOCcomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // 可以获取到高阶组件传递过来的额外属性
    console.log(this.props);
  }
  render() {
    return <input />;
  }
}

export default Mycontainer(HOCcomponent);
