import React from 'react';
import styles from './panel.module.scss';

class Panel extends React.Component {
  render() {
    return (
      <div className={styles.Panel}>
        <p>panel 组件888</p>
      </div>
    );
  }
}

export default Panel;
