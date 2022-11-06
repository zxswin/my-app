import React, { useEffect } from 'react';
import { formatSearchParam } from '../../utils/format';
import { formatProdData } from '../../utils/products';
import ProdDetail from '../../components/common/prodDetail';
import styles from './style.scss';

const ProdPage = props => {
  console.log('props=====', props);
  const {
    location: { search },
    prodPageData,
    getProdData,
    shopCarList,
    history,
  } = props;

  useEffect(() => {
    const prodId = formatSearchParam(search);
    getProdData({ id: prodId });
  }, []);

  const formatProdList = formatProdData(prodPageData, shopCarList);

  // 点击添加购物车后跳转到主页
  const onClose = () => {
    history.push('/');
  };

  return (
    <div className={styles.ProdPage}>{!!formatProdList.length && <ProdDetail {...props} data={formatProdList[0]} onClose={onClose} />}</div>
  );
};

export default ProdPage;
