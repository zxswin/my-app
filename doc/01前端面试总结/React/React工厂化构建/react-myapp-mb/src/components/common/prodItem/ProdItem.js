import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Loader from '../loader';
import Button from '../button';
import styles from './style.scss';

const ProdItem = props => {
  const { item, currScrollTop, currOffsetHeight, currMenuType } = props;
  const { iconSrc, name, standard, type, describe, disablePrice, currShopAmout } = item;
  const prodItemEl = useRef(null);
  const imgEl = useRef(null);

  // 是否显示图片
  const [showImg, setShowImg] = useState(false);

  const clickHandle = () => {
    const { onClick } = props;
    onClick && onClick(item);
  };

  // 父组件高度变化时候去获取距离顶部的高度
  useEffect(() => {
    const prodItemBoxEl = prodItemEl.current;
    const offsetTop = prodItemBoxEl.offsetTop;

    if (currScrollTop + currOffsetHeight >= offsetTop) {
      const imgBoxEl = imgEl.current;
      imgBoxEl.src = iconSrc;
      setShowImg(true);
    }
  }, [currScrollTop, currMenuType]);

  return (
    <div ref={prodItemEl} className={classnames(styles.ProdItem)} data-type={type} onClick={clickHandle}>
      {/* 图片 */}
      <div className={styles.img}>
        <img ref={imgEl} alt={name} className={classnames({ [styles.imgShow]: showImg })} />
        {!showImg && <Loader />}
      </div>
      {/* 内容区域 */}
      <div className={styles.content}>
        {/* 标题 */}
        <div className={styles.title}>
          {name}
          {/* {!!standard && `(${standard})`} */}
        </div>
        {/* 描述 */}
        <div className={styles.describe}>{describe}</div>
        {/* 价格及购买按钮 */}
        <div className={styles.priceContain}>
          <div className={styles.price}>{disablePrice}</div>
          <div className={styles.buttonContain}>
            {!!currShopAmout && <div className={styles.currShopAmout}>{currShopAmout}</div>}
            <Button text={'选购'} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProdItem;
