import { connect } from 'react-redux';
import ProdPage from '../pages/prodPage';
import { getMenuList, setCurrMenuType, setShopCarList } from '../actions/ProdLists';
import { getProdData } from '../actions/ProdPage';

const mapStateToProps = state => {
  const {
    ProdPage: { prodPageData },
    ProductLists: { productLists, menuList, shopCarList },
  } = state;

  return {
    productLists,
    menuList,
    shopCarList,
    prodPageData,
  };
};

const mapDispatchToProps = {
  getMenuList,
  setCurrMenuType,
  setShopCarList,
  getProdData,
};

const Contain = connect(mapStateToProps, mapDispatchToProps)(ProdPage);

export default Contain;
