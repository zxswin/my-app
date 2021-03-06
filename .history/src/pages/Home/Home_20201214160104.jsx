import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeUi extends Component {
  render() {
    const { value, onIncreaseClick } = this.props;
    return (
      <div className="Home">
        <p>这是Home</p>
        <p>{value}</p>
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
