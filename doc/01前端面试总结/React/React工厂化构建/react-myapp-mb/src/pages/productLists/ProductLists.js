import React, { useEffect } from 'react';
import { formatMenuList } from '../../utils/products';
import LeftMenuList from '../../components/leftMenuList';
import RightProdList from '../../components/rightProdList';
import styles from './style.scss';

const ProductLists = props => {
  const { getMenuList, menuList, shopCarList, setHistory, history } = props;

  useEffect(() => {
    getMenuList();
    setHistory(history);
  }, []);

  const { formaMenutList, formatProdList } = formatMenuList(menuList, shopCarList);

  console.log('formatProdList', formatProdList);

  return (
    <div className={styles.ProductLists}>
      <div className={styles.leftPanel}>
        <LeftMenuList {...props} data={formaMenutList} />
      </div>
      <div className={styles.rightPanel}>
        <RightProdList {...props} data={formatProdList} />
      </div>
    </div>
  );
};

export default ProductLists;
