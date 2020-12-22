import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeUi extends Component {
  componentDidMount() {
    console.log('homeui组件从新挂载了8');
  }
  render() {
    const { value, onIncreaseClick } = this.props;
    return (
      <div className="Home">
        <p>这是Home</p>
        <p>计算值:{value}</p>
        <button onClick={onIncreaseClick}>增加</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    value: state.count,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch({ type: 'increase' }),
  };
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeUi);

export default Home;
