import React, { Component } from 'react';
import Fishs from './modules/Fishs';
import './style.scss';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Product">
        <Fishs />
      </div>
    );
  }
}

export default Product;
