import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import styles from './product.module.scss';

class Product extends Component {
  render() {
    return (
      <div className={styles.Product}>
        <div>这是产品中心</div>
      </div>
    );
  }
}

export default Product;
