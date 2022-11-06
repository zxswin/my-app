import React, { useEffect, useCallback, useRef } from 'react';
import $ from 'jquery';
import MenuItem from '../common/menuItem';
import styles from './style.scss';

const LeftMenuList = props => {
  const { data, setCurrMenuType, currMenuType } = props;

  const leftMenuEl = useRef(null);

  // 点击选择菜单项的时候菜单栏目发生的滚动
  const clickMenuItem = useCallback((type, offsetTop) => {
    const { current: menuBoxEl } = leftMenuEl;
    $(menuBoxEl).animate({ scrollTop: offsetTop }, 'fast');
    setCurrMenuType({
      action: 'click',
      type,
    });
  }, []);

  // 菜单类型发生变化的时候,菜单栏目的滚动
  useEffect(() => {
    const { type } = currMenuType;
    const { current: menuBoxEl } = leftMenuEl;
    const currMenuTypeItemList = $(menuBoxEl).find(`[data-type="${type}"]`);
    const currMenuTypeItem = currMenuTypeItemList[0];

    if (currMenuTypeItem) {
      const offsetTop = currMenuTypeItem.offsetTop;
      $(menuBoxEl).animate({ scrollTop: offsetTop }, 'fast');
    }
  }, [currMenuType]);

  return (
    <div ref={leftMenuEl} className={styles.LeftMenuList}>
      {data.map((item, i) => (
        <MenuItem key={`${i}${item.type}`} currMenuType={currMenuType} item={item} onClick={clickMenuItem} />
      ))}
    </div>
  );
};
export default LeftMenuList;
