import { connect } from 'react-redux';
import HotSale from '../pages/hotSale';
import { getMenuList, setCurrMenuType, setShopCarList } from '../actions/ProdLists';

const mapStateToProps = state => {
  const {
    HotSale: {},
    ProductLists: { productLists, menuList, shopCarList },
  } = state;

  return {
    productLists,
    menuList,
    shopCarList,
  };
};

const mapDispatchToProps = {
  getMenuList,
  setCurrMenuType,
  setShopCarList,
};

const Contain = connect(mapStateToProps, mapDispatchToProps)(HotSale);

export default Contain;
