import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { ignoreNavBarList } from '../../config/router/router.config';
import TitleBar from '../titleBar';
import NavBar from '../navBar';
import ShopCarWeget from '../common/shopCarWeget';
import ShopCarList from '../common/shopCarList';
import MaskBox from '../common/maskBox';
import Popup from '../common/popup';
import OrderDetail from '../common/orderDetail';
import { formatSearchParamStr } from '../../utils/format';
import { getUniqueCode } from '../../utils/agent';
import styles from './style.scss';

const CurrRoute = props => {
  const {
    location: { pathname, search, hash },
    routerConfig,
    shopCarList,
    showShopList,
    setShowShopList,
    setShopCarList,
    showOrderDetailList,
    setShowOrderDetailList,
    popupData,
    getAppAgentData,
  } = props;

  // 设置顶部标题
  const [title, setTitle] = useState('');

  useEffect(() => {
    const unique_code = getUniqueCode();
    //重新属性代理设置;
    if (hash && unique_code) {
      getAppAgentData({ unique_code, setTitle });
    }
  }, [hash]);

  // 第一次加载的时候执行
  useEffect(() => {
    const unique_code = formatSearchParamStr(search);
    const agentDataStr = sessionStorage.getItem('appAgentData');

    if (unique_code) {
      getAppAgentData({ unique_code, setTitle });
    } else if (agentDataStr) {
      const appAgentData = JSON.parse(agentDataStr);
      const { unique_code } = appAgentData;
      getAppAgentData({ unique_code, setTitle });
    } else {
      document.title = CONFIG.TITLE;
      setTitle('欢迎光临潮味生鲜');
    }
  }, []);

  // 获取当前路由配置
  const currRouterConfig = routerConfig.find(router => router.path === pathname);

  // 未找到路由的路由配置
  const NoFoundConfig = routerConfig.find(router => router.path === null);

  // 路径没有匹配到的时候展示的组件
  let currComponent = NoFoundConfig.component;

  // 匹配到路由路径
  if (currRouterConfig && currRouterConfig.path !== null) {
    const { component } = currRouterConfig;
    currComponent = component;
  }

  // 关闭订单明细弹出层
  const closeOrderDetail = () => {
    setShowOrderDetailList(false);
  };

  if (CONFIG.ISAGENTEVN && !getUniqueCode()) {
    document.title = '';
    return null;
  }

  return (
    <div className={styles.CurrRoute}>
      <TitleBar title={title} />
      <Route path={currRouterConfig ? currRouterConfig.path : null} component={currComponent} />
      {!ignoreNavBarList.includes(pathname) && <NavBar pathname={pathname} />}
      {!!shopCarList.length && !showShopList && <ShopCarWeget shopCarList={shopCarList} setShowShopList={setShowShopList} />}
      {showShopList && (
        <ShopCarList
          setShopCarList={setShopCarList}
          shopCarList={shopCarList}
          setShowShopList={setShowShopList}
          setShowOrderDetailList={setShowOrderDetailList}
        />
      )}
      {/* 订单明细展示 */}
      {showOrderDetailList && (
        <MaskBox onClose={closeOrderDetail}>
          <OrderDetail {...props} shopCarList={shopCarList} />
        </MaskBox>
      )}

      {/* 弹出窗口 */}
      {popupData.isShow && <Popup {...props} />}
    </div>
  );
};

export default CurrRoute;
