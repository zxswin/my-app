import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import ReactSwiper from 'reactjs-swiper';
import NP from 'number-precision';
import CountAmout from '../countAmout';
import Button from '../button';
import styles from './style.scss';

const ProdDetail = props => {
  const { data, shopCarList = [], setShopCarList } = props;
  console.log('data', data);
  const { id, slideImgsJson, name, standard, describe, video_url, videoSrc, price, currShopAmout = 1, type } = data;

  const [shopAmout, setShopAmout] = useState(currShopAmout);

  // 需要展示到tab detail-> 产品详情tab  vedio -> 产品视频tab
  const [currTab, setCurrTab] = useState('detail');

  // 轮播图选项
  const swiperOptions = {
    preloadImages: true,
    autoplay: 4000,
    autoplayDisableOnInteraction: false,
  };

  // 点击加号按钮
  const addClick = useCallback(() => {
    const currAmout = NP.plus(shopAmout, 1);
    setShopAmout(currAmout);
  }, [shopAmout]);

  // 点击减号按钮
  const minusClick = useCallback(() => {
    const currAmout = NP.minus(shopAmout, 1);
    if (currAmout > 0) {
      setShopAmout(currAmout);
    }
  }, [shopAmout]);

  // 点击加入购物车按钮
  const addShopCarListClick = useCallback(() => {
    const { onClose } = props;
    const currShopCarList = _.cloneDeep(shopCarList);

    const totalPrice = NP.times(shopAmout, price);

    const prodItem = {
      id,
      price,
      shopAmout,
      standard,
      name,
      totalPrice,
    };

    const currShopProdItemIndex = currShopCarList.findIndex(item => item.id === id);

    if (currShopProdItemIndex > -1) {
      currShopCarList[currShopProdItemIndex] = prodItem;
    } else {
      currShopCarList.push(prodItem);
    }

    setShopCarList(currShopCarList);

    onClose && onClose();
  }, [shopAmout, shopCarList, data]);

  // 点击切换tab页面
  const tabClick = useCallback(tab => {
    setCurrTab(tab);
  }, []);

  const agentDataStr = sessionStorage.getItem('appAgentData');
  const appAgentData = agentDataStr ? JSON.parse(agentDataStr) : {};
  const { shop_name = '潮味' } = appAgentData;

  return (
    <div className={classnames(styles.ProdDetail)}>
      {/* tab标签 */}
      <div className={styles.tabContain}>
        <span className={classnames({ [styles.active]: currTab === 'detail' })} onClick={() => tabClick('detail')}>
          产品详情
        </span>
        {!!video_url && (
          <span className={classnames({ [styles.active]: currTab === 'video' })} onClick={() => tabClick('video')}>
            产品视频
          </span>
        )}
      </div>

      {/* 产品详情 */}
      {currTab === 'detail' && (
        <div className={styles.content}>
          {/* 轮播图 */}
          <ReactSwiper className={styles.swiper} swiperOptions={swiperOptions} showPagination items={slideImgsJson} />
          {/* 标题及描述 */}
          <div className={styles.prodInfo}>
            <h2>{name}</h2>
            <div className={styles.describe}>{describe}</div>
          </div>
          {/* 图片展示区域 */}
          <div className={styles.imgContain}>
            {slideImgsJson.map((item, i) => (
              <div className={styles.imgContent} key={`${i}${item.src}`}>
                <h2>{'产品展示'}</h2>
                <img src={item.image} alt={item.title} />
                <div className={styles.watermark}>{`${shop_name}生鲜实拍`}</div>
              </div>
            ))}
            {/* {type !== 'supplements' && (
              <div className={styles.imgContent}>
                <h2>{'包装展示'}</h2>
                <img src={'https://m.cwsx.com.cn/public/uploads/products/fish/20210704/dce43c90-dca.jpg'} alt={'产品包装'} />
              </div>
            )} */}
          </div>
        </div>
      )}

      {/* 产品视频 */}
      {currTab === 'video' && (
        <div className={styles.videoContain}>
          <video className={styles.video} controls loop>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      )}

      {/* 底部固定加入购物车栏目 */}
      {currTab === 'detail' && (
        <div className={styles.shopContain}>
          {/* 价格区域 */}
          <div className={styles.priceContent}>
            <div className={styles.price}>
              <div className={styles.priceText}>{price}元</div>
              <div>{standard}</div>
            </div>
            {/* 选购计算器 */}
            <div className={styles.CountAmout}>
              <CountAmout amout={shopAmout} addClick={addClick} minusClick={minusClick} />
            </div>
          </div>
          {/* 加入购物车按钮区域 */}
          <div className={styles.addBtn}>
            <Button text={'加入购物车'} size={'fullSize'} onClick={addShopCarListClick} />
          </div>
        </div>
      )}
    </div>
  );
};
export default ProdDetail;
