import React, { Component } from 'react';

const Mycontainer = (WrappedComponent) => {
  return class extends WrappedComponent {
    render() {
      return super.render();
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
    return (
      <div className="HOCcomponent">
        <div>这是一个包装组件</div>
      </div>
    );
  }
}

export default Mycontainer(HOCcomponent);
