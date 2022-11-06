import React, { useEffect, useRef, useCallback } from 'react';
import _ from 'lodash';
import NP from 'number-precision';
import $ from 'jquery';
import MaskBox from '../../common/maskBox';
import CountAmout from '../countAmout';
import IconSvg from '../iconSvg';
import Button from '../button';
import { formatShopCarList } from '../../../utils/products';
import styles from './style.scss';

const ShopCarList = props => {
  const { shopCarList, setShowShopList, setShopCarList, setShowOrderDetailList } = props;
  const formatShopCarData = formatShopCarList(shopCarList);
  const { totalAmout, totalPrice } = formatShopCarData;

  // 获取dom 节点
  const shopCarListRef = useRef(null);
  const clearBtnContentRef = useRef(null);

  // 进入页面执行动画效果展示
  useEffect(() => {
    const shopCarListDom = shopCarListRef.current;
    const clearBtnContentDom = clearBtnContentRef.current;

    $(clearBtnContentDom).animate({ bottom: 0 }, 'fast', () => {
      setTimeout(() => {
        const height = shopCarListDom.clientHeight;
        $(shopCarListDom).animate({ top: -height }, 'fast');
      }, 300);
    });
  }, []);

  // 当数量发生变化的时候触发
  useEffect(() => {
    if (totalAmout === 0) {
      setShowShopList(false);
    }
    // 重置购物车列表位置
    setTimeout(() => {
      const shopCarListDom = shopCarListRef.current;
      const height = shopCarListDom ? shopCarListDom.clientHeight : null;
      if (height) $(shopCarListDom).animate({ top: -height }, 'fast');
    }, 300);
  }, [totalAmout]);

  // 关闭购物车列表面板
  const onMaskClick = () => {
    setShowShopList(false);
  };

  // 点击清空购物车按钮
  const clickClearShopCar = () => {
    setShowShopList(false);
    setShopCarList([]);
  };

  // 获取加减后的购物item
  const getModifyShopCarItem = (shopCarItem, type) => {
    const { shopAmout, price } = shopCarItem;
    let currShopAmout = 0;
    let currTotalPrice = 0;

    if (type === 'add') {
      currShopAmout = NP.plus(shopAmout, 1);
    } else if (type === 'minus') {
      currShopAmout = NP.minus(shopAmout, 1);
    }
    currTotalPrice = NP.times(price, currShopAmout);
    shopCarItem.shopAmout = currShopAmout;
    shopCarItem.totalPrice = currTotalPrice;

    return shopCarItem;
  };

  // 点击加号按钮
  const addClickHandle = useCallback(
    index => {
      const currShopCarList = _.cloneDeep(shopCarList);
      const currentShopCarItem = currShopCarList[index];
      if (currentShopCarItem) {
        currShopCarList[index] = getModifyShopCarItem(currentShopCarItem, 'add');
        setShopCarList(currShopCarList);
      }
    },
    [shopCarList]
  );

  // 点击减号按钮
  const minusClickHandle = useCallback(
    index => {
      const currShopCarList = _.cloneDeep(shopCarList);
      const currentShopCarItem = currShopCarList[index];
      if (currentShopCarItem) {
        const shopCarItem = getModifyShopCarItem(currentShopCarItem, 'minus');
        const { shopAmout } = shopCarItem;
        if (shopAmout <= 0) {
          currShopCarList.splice(index, 1);
        } else {
          currShopCarList[index] = shopCarItem;
        }

        setShopCarList(currShopCarList);
      }
    },
    [shopCarList]
  );

  // 点击了结算按钮
  const settlementClick = useCallback(() => {
    setShowOrderDetailList(true);
  }, [setShowOrderDetailList]);

  return (
    <MaskBox type={'bottom'} onMaskClick={onMaskClick}>
      <div ref={shopCarListRef} className={styles.ShopCarList}>
        {/* 清空购物车栏 */}
        <div className={styles.clearShopCar}>
          <IconSvg type="delete" theme={styles} onClick={clickClearShopCar} />
          <span onClick={clickClearShopCar}>清空购物车</span>
        </div>
        {/* 购物车列表 */}
        <div className={styles.shopListContent}>
          {shopCarList.map((item, i) => (
            <div key={`${i}${item.name}`} className={styles.shopItem}>
              <div className={styles.shopItemName}>
                <div>{item.name}</div>
                <div className={styles.standard}>{item.standard}</div>
              </div>
              <div className={styles.priceContain}>{item.totalPrice}</div>
              <div className={styles.CountAmout}>
                <CountAmout amout={item.shopAmout} addClick={() => addClickHandle(i)} minusClick={() => minusClickHandle(i)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 结算按钮部分 */}
      <div ref={clearBtnContentRef} className={styles.clearBtnContent}>
        <div>{totalPrice}</div>
        <div>
          <Button text={'结算'} className={styles.clearBtn} onClick={settlementClick} />
        </div>
        {/* 购物车图标 */}
        <div className={styles.shopCarContain}>
          <IconSvg type="shopCar" theme={styles} />
          <span>购物车</span>
          {/* 购物数量 */}
          <div className={styles.totalAmout}>{totalAmout}</div>
        </div>
      </div>
    </MaskBox>
  );
};
export default ShopCarList;
