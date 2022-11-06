import { connect } from 'react-redux';
import Agent from '../pages/agent';
import { fetchAppConfig, setGlobalPopupData, setHaveCopyOrderList, getAppAgentData } from '../actions/App';
import { getMenuList, setCurrMenuType, setShopCarList } from '../actions/ProdLists';

const mapStateToProps = state => {
  const {
    App: { appConfig, appError, popupData, haveCopyOrderList, appAgentData },
    Agent: {},
    ProductLists: { productLists, menuList, shopCarList },
  } = state;

  return {
    productLists,
    menuList,
    shopCarList,
    appConfig,
    appError,
    popupData,
    haveCopyOrderList,
    appAgentData,
  };
};

const mapDispatchToProps = {
  getMenuList,
  setCurrMenuType,
  setShopCarList,
  fetchAppConfig,
  setGlobalPopupData,
  setHaveCopyOrderList,
  getAppAgentData,
};

const Contain = connect(mapStateToProps, mapDispatchToProps)(Agent);

export default Contain;
