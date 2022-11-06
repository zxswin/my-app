import React, { useState, useEffect, useRef } from 'react';
import DriedFoodItem from '../common/driedFoodItem';
import ProdDetail from '../common/prodDetail';
import MaskBox from '../common/maskBox';
import { formatMenuList } from '../../utils/products';

import styles from './style.scss';
import { useCallback } from 'react';

const PlusProdList = props => {
  const { getMenuList, menuList, shopCarList, type } = props;
  // 当前展开的产品详情数据
  const [prodDetail, setProdDetail] = useState({});
  // 是否弹出产品详情遮罩层
  const [showDetail, setShowDetail] = useState(false);

  // 当前滚动的距离
  const [currScrollTop, setCurrScrollTop] = useState(0);
  // 容器层可见高度
  const [currOffsetHeight, setCurrOffsetHeight] = useState(0);
  const plusProdEl = useRef(null);

  const scrollHandel = e => {
    const scrollTop = e.target.scrollTop;
    setCurrScrollTop(scrollTop);
  };

  useEffect(() => {
    getMenuList();
    const plusListBoxEl = plusProdEl.current;
    const offsetHeight = plusListBoxEl.offsetHeight;
    setCurrOffsetHeight(offsetHeight);
  }, []);

  const { formatProdList } = formatMenuList(menuList, shopCarList);
  let driedFoodList = [];
  if (type === 'dried') {
    driedFoodList = formatProdList.filter(item => item.productmenuId === 'supplements');
  } else if (type === 'hot') {
    driedFoodList = formatProdList.filter(item => item.sales_volume >= 1000);
  }

  // 点击购物按钮
  const onClickShopBtn = driedFoodItem => {
    setProdDetail(driedFoodItem);
    setShowDetail(true);
  };

  // 关闭产品详情遮罩层
  const closeMaskHandle = () => {
    setShowDetail(false);
  };

  return (
    <div ref={plusProdEl} className={styles.PlusProdList} onScroll={scrollHandel}>
      {driedFoodList.map((prodItem, i) => (
        <DriedFoodItem
          currOffsetHeight={currOffsetHeight}
          currScrollTop={currScrollTop}
          pageType={type}
          key={`${i}${prodItem.name}`}
          driedFoodItem={prodItem}
          onClickShopBtn={onClickShopBtn}
        />
      ))}
      {/* 产品详情遮罩层 */}
      {showDetail && (
        <MaskBox onClose={closeMaskHandle}>
          <ProdDetail {...props} data={prodDetail} onClose={closeMaskHandle} />
        </MaskBox>
      )}
    </div>
  );
};

export default PlusProdList;
