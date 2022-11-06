import React, { useCallback, useRef } from 'react';
import classnames from 'classnames';
import styles from './style.scss';

const MenuItem = props => {
  const menuItemEl = useRef(null);
  const { item, currMenuType } = props;
  const { type: currMenu } = currMenuType;
  const { src: menuImg, name: menuTitle, type } = item;

  const clickMenuItem = useCallback(() => {
    const { current: menuItemBoxEl } = menuItemEl;
    const offsetTop = menuItemBoxEl.offsetTop;
    const { onClick } = props;
    onClick && onClick(type, offsetTop);
  }, []);

  return (
    <div
      ref={menuItemEl}
      className={classnames(styles.MenuItem, currMenu === type ? styles.activeMenuItem : '')}
      onClick={clickMenuItem}
      data-type={type}
    >
      <div className={styles.menuImg}>
        <img src={menuImg} alt={menuTitle} />
      </div>
      <h2 className={styles.menuTitle}>{menuTitle}</h2>
    </div>
  );
};
export default MenuItem;
