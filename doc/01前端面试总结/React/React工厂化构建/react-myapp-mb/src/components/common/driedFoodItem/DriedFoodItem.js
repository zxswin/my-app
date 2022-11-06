import React, { useState, useCallback, useRef, useEffect } from 'react';
import classnames from 'classnames';
import Loader from '../loader';
import IconSvg from '../iconSvg';
import styles from './style.scss';

const DriedFoodItem = props => {
  const { driedFoodItem, onClickShopBtn, pageType = '', currScrollTop, currOffsetHeight } = props;
  const { iconSrc, name, disablePrice, standard, currShopAmout } = driedFoodItem;
  // 是否显示图片
  const [showImg, setShowImg] = useState(false);
  const prodItemEl = useRef(null);
  const imgEl = useRef(null);

  useEffect(() => {
    const prodItemBoxEl = prodItemEl.current;
    const offsetTop = prodItemBoxEl.offsetTop;

    if (currScrollTop + currOffsetHeight >= offsetTop) {
      const imgBoxEl = imgEl.current;
      imgBoxEl.src = iconSrc;
      setShowImg(true);
    }
  }, [currScrollTop, currOffsetHeight]);

  // 点击购物车按钮
  const shopBtnClickHandle = useCallback(() => {
    onClickShopBtn && onClickShopBtn(driedFoodItem);
  }, [driedFoodItem]);

  return (
    <div ref={prodItemEl} className={classnames(styles.DriedFoodItem)} onClick={shopBtnClickHandle}>
      {/* 大图展示 */}
      <div className={styles.imgContain}>
        <span className={styles.imgMark}>{pageType === 'hot' ? '热销精品' : '干货精品'}</span>
        <img ref={imgEl} alt={name} className={classnames({ [styles.imgShow]: showImg })} />
        {!showImg && <Loader />}
      </div>
      {/* 相关标签展示 */}
      <div className={styles.markContain}>
        <span className={styles.type}>{pageType === 'hot' ? '热销品种' : '绿色健康'}</span>
        <span className={styles.level}>精</span>
      </div>
      {/* 产品名称及规格展示 */}
      <div className={styles.prodNameContain}>
        <div>
          <span className={styles.name}>{name}</span>
          {!!standard && <span className={styles.standard}>{` (${standard})`}</span>}
        </div>
      </div>
      {/* 价格及购物车按钮 */}
      <div className={styles.priceContain}>
        <span className={styles.price}>{disablePrice}</span>
        <div className={styles.shopBtnContain}>
          <IconSvg type="shopCar" theme={styles} />
          {currShopAmout && <div className={styles.shopCount}>{currShopAmout}</div>}
        </div>
      </div>
    </div>
  );
};
export default DriedFoodItem;
