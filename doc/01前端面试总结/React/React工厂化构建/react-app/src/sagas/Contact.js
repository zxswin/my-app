import { call, put, takeEvery } from 'redux-saga/effects';
import { APP_ERR } from '../actions/App';
import { FETCH_CONCAT_DATA, CONTACT_DATA } from '../actions/Contact';
import Api from '../api';

function* getConcatData(action) {
  const { request } = action;
  console.log('request====', request);
  const requestParam = {
    pageStart: 1,
    pageSize: 1000000,
  };
  try {
    const data = yield call(Api.getProduct, requestParam);
    yield put({ type: CONTACT_DATA, concatData: data });
  } catch (e) {
    yield put({ type: APP_ERR, appErr: e.message });
  }
}

function* App() {
  yield takeEvery(FETCH_CONCAT_DATA, getConcatData);
}

export default App;
