import React, { Component } from 'react';

const Mycontainer = WrappedComponent => {
  return class extends WrappedComponent {
    render() {
      const elementsTree = super.render();
      console.log('elementTree', elementsTree);
      console.log('获取包装组件的props', this.props);
      console.log('获取包装组件的state', this.state);
      let newProps = {};
      if (elementsTree && elementsTree.type === 'input') {
        newProps = {
          value: '经过高阶组件修改后的输入控件的值',
          onChange: () => {},
        };
      }
      const props = Object.assign({}, elementsTree.props, newProps);
      const newElementsTree = React.cloneElement(elementsTree, props, elementsTree.props.children);
      return newElementsTree;
    }
  };
};

class HOCcomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    this.setState(
      (preState, props) => {
        console.log('包装组件的preState', preState);
        console.log('包装组件的props', props);
        return {
          show: true,
        };
      },
      () => {
        console.log('包装组件状态已经发生改变');
      }
    );
  }

  render() {
    return <input value="这是一个包装组件" />;
  }
}

export default Mycontainer(HOCcomponent);
