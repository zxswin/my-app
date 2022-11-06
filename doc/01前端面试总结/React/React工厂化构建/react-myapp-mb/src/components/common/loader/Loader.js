import React from 'react';
import classnames from 'classnames';
import styles from './style.scss';

const Loader = props => {
  const { theme = {} } = props;
  return (
    <div className={classnames(styles.Loader, theme.Loader ? theme.Loader : '')}>
      <div className={classnames(styles.LoaderContent, theme.LoaderContent ? theme.LoaderContent : '')}>
        <div className={classnames(styles.bigLoader, theme.bigLoader ? theme.bigLoader : '')}></div>
        <div className={classnames(styles.smallLoader, theme.smallLoader ? heme.smallLoader : '')}></div>
      </div>
    </div>
  );
};
export default Loader;
