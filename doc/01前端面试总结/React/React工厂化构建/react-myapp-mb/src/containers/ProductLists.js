import { connect } from 'react-redux';
import ProductLists from '../pages/productLists';
import { getMenuList, setCurrMenuType, setShopCarList } from '../actions/ProdLists';
import { setHistory } from '../actions/App';

const mapStateToProps = state => {
  const {
    ProductLists: { productLists, menuList, shopCarList, currMenuType },
  } = state;

  return {
    productLists,
    menuList,
    shopCarList,
    currMenuType,
  };
};

const mapDispatchToProps = {
  getMenuList,
  setCurrMenuType,
  setShopCarList,
  setHistory,
};

const Contain = connect(mapStateToProps, mapDispatchToProps)(ProductLists);

export default Contain;
