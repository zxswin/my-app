import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Fishs from './modules/Fishs/Fishs';
import Vegetables from './modules/Vegetables/Vegetables';
import styles from './product.module.scss';

class Product extends Component {
  render() {
    return (
      <div className={styles.Product}>
        <div className="product-nav">
          <NavLink to="home/product/fishs" activeClassName="active-select" />
          <NavLink
            to="home/product/vegetables"
            activeClassName="active-select"
          />
        </div>

        <div className="product-content">
          <Switch>
            <Route path="home/product/fishs" component={Fishs} />
            <Route path="home/product/vegetables" component={Vegetables} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Product;
