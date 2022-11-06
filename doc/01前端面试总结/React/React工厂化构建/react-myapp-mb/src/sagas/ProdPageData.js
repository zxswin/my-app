import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_PROD_PAGE_DATA, PROD_PAGE_DATA } from '../actions/ProdPage';
import { APP_ERROR } from '../actions/App';
import Api from '../api';

// 获取某个产品数据
function* getProdPageData(action) {
  const { request } = action;
  const requestParam = {
    pageStart: 1,
    pageSize: 1000000,
  };

  try {
    const data = yield call(Api.getProduct, { ...requestParam, ...request });
    const {
      data: { rows },
    } = data;
    yield put({ type: PROD_PAGE_DATA, prodPageData: rows });
  } catch (e) {
    yield put({ type: APP_ERROR, err: e.message });
  }
}

function* ProdPageData() {
  yield takeEvery(FETCH_PROD_PAGE_DATA, getProdPageData);
}

export default ProdPageData;
