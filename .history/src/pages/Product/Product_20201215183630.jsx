import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import classnames from 'classnames';
import Fishs from './modules/Fishs/Fishs';
import Vegetables from './modules/Vegetables/Vegetables';
import styles from './product.module.scss';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const initRouteState = this.props.location.pathname === '/home/product';
    return (
      <div className={styles.Product}>
        <div className="product-nav">
          <div>产品中心</div>
          <NavLink
            to="/home/product/fishs"
            className={classnames({ 'active-select': initRouteState })}
            activeClassName="active-select"
          >
            鱼类中心
          </NavLink>

          <NavLink
            to="/home/product/vegetables"
            activeClassName="active-select"
          >
            蔬菜中心
          </NavLink>
        </div>

        <div className="product-content">
          <Switch>
            <Route path="/home/product/fishs" component={Fishs} />
            <Route path="/home/product/vegetables" component={Vegetables} />
            <Route component={Fishs} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Product;
