import React from 'react';
import Layout from '../../components/layout';
import styles from './style.scss';

const App = props => {
  const arr = [1, 2, 3, 4, 5, 6];
  const arr2 = [6, 7, 8, 9, 10];
  console.log([...arr, ...arr2]);

  return (
    <div className={styles.App}>
      <Layout {...props} />
    </div>
  );
};

export default App;
