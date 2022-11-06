import { call, put, takeEvery } from 'redux-saga/effects';
import { MENU_LIST, FETCH_MENU_LIST, CURR_MENU_TYPE } from '../actions/ProdLists';
import { APP_ERROR } from '../actions/App';
import Api from '../api';

// 获取菜单及产品数据
function* getMenuList() {
  const request = {
    pageStart: 1,
    pageSize: 1000000,
  };
  try {
    const data = yield call(Api.getProductMenu, request);
    const {
      data: { rows },
    } = data;
    yield put({ type: MENU_LIST, menuList: rows });
    yield put({
      type: CURR_MENU_TYPE,
      currMenuType: {
        action: '',
        type: 'fish',
      },
    });
  } catch (e) {
    yield put({ type: APP_ERROR, err: e.message });
  }
}

function* ProductLists() {
  yield takeEvery(FETCH_MENU_LIST, getMenuList);
}

export default ProductLists;
