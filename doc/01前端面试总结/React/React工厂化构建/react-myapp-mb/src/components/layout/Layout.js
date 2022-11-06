import React from 'react';
import { Switch } from 'react-router-dom';
import routerConfig from '../../config/router/router.config';
import CurrRoute from '../currRoute';
import styles from './style.scss';

const Layout = props => {
  return (
    <div className={styles.Layout}>
      <Switch>
        <CurrRoute {...props} routerConfig={routerConfig} />
      </Switch>
    </div>
  );
};

export default Layout;
