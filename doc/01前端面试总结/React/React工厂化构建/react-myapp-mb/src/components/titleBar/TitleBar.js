import React from 'react';
import styles from './style.scss';

const TitleBar = props => {
  const { title } = props;
  return (
    <div className={styles.TitleBar}>
      <div>{title}</div>
    </div>
  );
};
export default TitleBar;
