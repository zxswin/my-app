import { connect } from 'react-redux';
import App from '../pages/app';
import { fetchAppConfig, setGlobalPopupData, setHaveCopyOrderList, getAppAgentData } from '../actions/App';
import { setShowShopList, setShopCarList, setShowOrderDetailList } from '../actions/ProdLists';

const mapStateToProps = state => {
  const {
    App: { appConfig, appError, popupData, history, haveCopyOrderList, appAgentData },
    ProductLists: { menuList, shopCarList, currMenuType, showShopList, showOrderDetailList },
  } = state;

  return {
    appConfig,
    appError,
    menuList,
    shopCarList,
    currMenuType,
    showShopList,
    showOrderDetailList,
    popupData,
    history,
    haveCopyOrderList,
    appAgentData,
  };
};

const mapDispatchToProps = {
  fetchAppConfig,
  setShowShopList,
  setShopCarList,
  setShowOrderDetailList,
  setGlobalPopupData,
  setHaveCopyOrderList,
  getAppAgentData,
};

const Contain = connect(mapStateToProps, mapDispatchToProps)(App);

export default Contain;
