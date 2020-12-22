import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './layout.module.scss';

class Layout extends Component {
  render() {
    return (
      <div className={styles.Layout}>
        <div className="layout-left"></div>
        <div className="layout-right"></div>
      </div>
    );
  }
}

export default Layout;
