import React, { Component } from 'react';
import styles from './layout.module.scss';
class Layout extends Component {
  render() {
    return (
      <div className={styles.Layout}>
        <div>这个是布局容器</div>
      </div>
    );
  }
}

export default Layout;
