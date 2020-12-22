import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <p>这是Home</p>
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

export default Home;
