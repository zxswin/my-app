export const PROD_LIST = 'PROD_LIST';
export const MENU_LIST = 'MENU_LIST';
export const SHOPCAR_DATA = 'SHOPCAR_DATA';
export const FETCH_MENU_LIST = 'FETCH_MENU_LIST';
export const CURR_MENU_TYPE = 'CURR_MENU_TYPE';
export const SHOW_SHOP_LIST = 'SHOW_SHOP_LIST';
export const SHOW_ORDER_DETAIL_LIST = 'SHOW_ORDER_DETAIL_LIST';

// 获取菜单列表数据
export function getMenuList() {
  return {
    type: FETCH_MENU_LIST,
  };
}

// 设置当前菜单
export function setCurrMenuType(currMenuType) {
  return {
    type: CURR_MENU_TYPE,
    currMenuType,
  };
}

// 设置购物车列表数据
export function setShopCarList(shopCarList) {
  return {
    type: SHOPCAR_DATA,
    shopCarList,
  };
}

// 设置是否显示购物车列表
export function setShowShopList(showShopList) {
  return {
    type: SHOW_SHOP_LIST,
    showShopList,
  };
}

// 设置是否显示订单明细列表
export function setShowOrderDetailList(showOrderDetailList) {
  return {
    type: SHOW_ORDER_DETAIL_LIST,
    showOrderDetailList,
  };
}
