import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Fishs from './modules/Fishs/Fishs';
import Vegetables from './modules/Vegetables/Vegetables';
import styles from './product.module.scss';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: this.props.location.pathname,
    };
  }
  componentDidMount() {
    console.log('产品模块', this.props, this.state.currentPath);
  }
  render() {
    return (
      <div className={styles.Product}>
        <div className="product-nav">
          <div>产品中心</div>
          <NavLink to="/home/product/fishs" activeClassName="active-select">
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
            <Route component={Fishs} />
            <Route path="/home/product/fishs" component={Fishs} />
            <Route path="/home/product/vegetables" component={Vegetables} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Product;
