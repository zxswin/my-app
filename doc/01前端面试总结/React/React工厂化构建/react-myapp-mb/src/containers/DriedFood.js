import { connect } from 'react-redux';
import DriedFood from '../pages/driedFood';
import { getMenuList, setCurrMenuType, setShopCarList } from '../actions/ProdLists';

const mapStateToProps = state => {
  const {
    DriedFood: {},
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

const Contain = connect(mapStateToProps, mapDispatchToProps)(DriedFood);

export default Contain;
