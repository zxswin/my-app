import React, { useState, useEffect, useRef, useCallback } from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import _ from 'lodash';
import ProdItem from '../common/prodItem';
import MaskBox from '../common/maskBox';
import ProdDetail from '../common/prodDetail';
import styles from './style.scss';

const RightProdList = props => {
  const { data, currMenuType, setCurrMenuType } = props;
  const prodListEl = useRef(null);
  const [prodTyepOffset, setProdTyepOffset] = useState(null);
  // 是否为点击事件触发的页面滚动
  let isClick = false;

  // 当前展开的产品详情数据
  const [prodDetail, setProdDetail] = useState({});
  // 是否弹出产品详情遮罩层
  const [showDetail, setShowDetail] = useState(false);

  // 当前滚动的距离
  const [currScrollTop, setCurrScrollTop] = useState(0);

  // 容器层可见高度
  const [currOffsetHeight, setCurrOffsetHeight] = useState(0);

  // 获取容器可见高度
  useEffect(() => {
    const prodListBoxEl = prodListEl.current;
    const offsetHeight = prodListBoxEl.offsetHeight;
    setCurrOffsetHeight(offsetHeight);
  }, []);

  // 检测菜单类型变化的滚动
  useEffect(() => {
    const { action, type } = currMenuType;
    if (action === 'click') {
      isClick = true;
      const prodListBoxEl = prodListEl.current;
      const currMenuTypeItemList = $(prodListBoxEl).find(`[data-type="${type}"]`);
      let offsetTop = 0;
      if (currMenuTypeItemList.length) {
        offsetTop = currMenuTypeItemList[0].offsetTop;
        setCurrScrollTop(offsetTop);
        $(prodListBoxEl).animate({ scrollTop: offsetTop }, 'fast', () => {
          // 动画执行完毕
          setTimeout(() => {
            isClick = false;
          }, 500);
        });
      }
    }
  }, [currMenuType]);

  const getProdTyepOffset = data => {
    let finalOffsetData = [];
    const filterData = _.uniqBy(data, 'type');
    const prodListBoxEl = prodListEl.current;
    const totalProdList = $(prodListBoxEl).find('> div');
    filterData.forEach((prodItem, i) => {
      const { type, index } = prodItem;
      let offsetRange = [];

      if (i + 1 < filterData.length) {
        const endIndex = filterData[i + 1].index;
        const startOffset = totalProdList[index].offsetTop;
        const endOffset = totalProdList[endIndex].offsetTop;
        offsetRange = [type, startOffset, endOffset];
      } else {
        const startOffset = totalProdList[index].offsetTop;
        offsetRange = [type, startOffset];
      }

      finalOffsetData.push(offsetRange);
    });

    setProdTyepOffset(finalOffsetData);
  };

  // 滚动事件监听
  const scrollHandel = useCallback(
    e => {
      if (!isClick) {
        const scrollTop = e.target.scrollTop;
        const { type } = currMenuType;
        setCurrScrollTop(scrollTop);
        if (scrollTop > 300) {
          if (!prodTyepOffset) {
            getProdTyepOffset(data);
          } else {
            const currTypeOffsetItem = prodTyepOffset.find(item => {
              if (item.length === 3) {
                return scrollTop > item[1] && scrollTop < item[2];
              } else {
                return item.length === 2;
              }
            });

            if (currTypeOffsetItem) {
              if (currTypeOffsetItem[0] !== type) {
                setCurrMenuType({
                  action: 'scroll',
                  type: currTypeOffsetItem[0],
                });
              }
            }
          }
        }
      }
    },
    [data, currMenuType, prodTyepOffset]
  );

  // 关闭产品详情遮罩层
  const closeMaskHandle = () => {
    setShowDetail(false);
  };

  // 产品点击事件
  const prodClickHandle = prodItem => {
    console.log('prodItem', prodItem);
    setProdDetail(prodItem);
    setShowDetail(true);
  };

  return (
    <div ref={prodListEl} className={classnames(styles.RightProdList)} onScroll={scrollHandel}>
      {data.map((item, i) => (
        <ProdItem
          key={`${i}${item.name}`}
          currOffsetHeight={currOffsetHeight}
          currScrollTop={currScrollTop}
          currMenuType={currMenuType}
          item={item}
          onClick={prodClickHandle}
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
export default RightProdList;
