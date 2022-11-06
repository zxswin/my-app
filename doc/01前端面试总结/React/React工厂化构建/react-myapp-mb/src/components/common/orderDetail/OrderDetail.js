import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '../button';
import { formatShopCarList, orderListCopyData } from '../../../utils/products';
import styles from './style.scss';

const OrderDetail = props => {
  console.log(props);
  const { shopCarList, popupData, setGlobalPopupData, setShowOrderDetailList, setShowShopList, history, setHaveCopyOrderList } = props;
  const formatShopCarData = formatShopCarList(shopCarList);
  const { totalAmout, totalPrice } = formatShopCarData;

  const copyOrderListStr = orderListCopyData(shopCarList, totalAmout, totalPrice);

  // 点击了复制订单按钮后的回调函数
  const onCopyHandle = () => {
    const currPopupData = _.cloneDeep(popupData);
    currPopupData.info = '订单列表已复制,点击确认按钮联系客服下单吧！';
    currPopupData.isShow = true;
    currPopupData.confirm = () => {
      setShowOrderDetailList(false);
      setShowShopList(false);
      setHaveCopyOrderList(true);
      history.push('/contact');
    };
    setGlobalPopupData(currPopupData);
  };

  return (
    <div className={classnames(styles.OrderDetail)}>
      <h2 className={styles.title}>订单明细</h2>
      {/* 订单列表 */}
      <div className={styles.orderListContain}>
        {shopCarList.map((orderItem, i) => {
          const { name, standard, shopAmout, price, totalPrice } = orderItem;
          return (
            <div key={`${i}${name}`} className={styles.orderItem}>
              <div className={styles.orderItemName}>
                <span>{name}</span>
                <span className={styles.standard}>{standard}</span>
              </div>
              <div className={styles.orderItemPrice}>
                <span>{shopAmout}</span>
                <span>x</span>
                <span>{price}</span>
              </div>
              <div className={styles.orderItemTotalPrice}>
                <span>{totalPrice}</span>
              </div>
            </div>
          );
        })}
        {/* 商品总计 */}
        <div className={styles.orderSummary}>
          <span>商品总计</span>
          <span>{totalPrice} 元</span>
        </div>
      </div>

      {/* 底部按钮部分 */}
      <div className={styles.bottomBtn}>
        <div className={styles.totalPrice}>总计: {totalPrice}元</div>
        <div className={styles.buttonContain}>
          <CopyToClipboard
            text={copyOrderListStr}
            onCopy={() => {
              onCopyHandle();
            }}
          >
            <Button text={'复制订单列表'} className={styles.confirmBtn} />
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;
