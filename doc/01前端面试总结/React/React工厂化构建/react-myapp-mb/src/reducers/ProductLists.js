import { PROD_LIST, MENU_LIST, SHOPCAR_DATA, CURR_MENU_TYPE, SHOW_SHOP_LIST, SHOW_ORDER_DETAIL_LIST } from '../actions/ProdLists';

const initState = {
  prodList: [],
  menuList: [],
  shopCarList: [],
  showShopList: false,
  showOrderDetailList: false,
  currMenuType: {
    action: '',
    type: 'fish',
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case PROD_LIST:
      const { prodList } = action.data;
      return { ...state, prodList };
    case MENU_LIST:
      const { menuList } = action;
      return { ...state, menuList };
    case SHOPCAR_DATA:
      const { shopCarList } = action;
      return { ...state, shopCarList };
    case CURR_MENU_TYPE:
      const { currMenuType } = action;
      return { ...state, currMenuType };
    case SHOW_SHOP_LIST:
      const { showShopList } = action;
      return { ...state, showShopList };
    case SHOW_ORDER_DETAIL_LIST:
      const { showOrderDetailList } = action;
      return { ...state, showOrderDetailList };
    default:
      return state;
  }
};

export default reducer;
