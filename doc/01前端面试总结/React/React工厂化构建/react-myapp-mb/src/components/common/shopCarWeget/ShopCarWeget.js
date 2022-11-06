import React from 'react';
import classnames from 'classnames';
import IconSvg from '../iconSvg';
import { formatShopCarList } from '../../../utils/products';
import styles from './style.scss';

const ShopCarWeget = props => {
  const { shopCarList, setShowShopList } = props;
  const formatShopCarData = formatShopCarList(shopCarList);
  const { totalAmout } = formatShopCarData;
  // 购物车数据格式化处理
  const shopCarClickHandle = () => {
    setShowShopList(true);
  };

  return (
    <div className={classnames(styles.ShopCarWeget)}>
      <div className={styles.shopTotalAmout}>{totalAmout}</div>
      <IconSvg type="shopCar" theme={styles} onClick={shopCarClickHandle} />
    </div>
  );
};
export default ShopCarWeget;
