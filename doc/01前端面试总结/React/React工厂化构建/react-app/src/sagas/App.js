import { call, put, takeEvery } from 'redux-saga/effects';
import { APP_ERR, FETCH_APP_DATA, APP_DATA } from '../actions/App';
import Api from '../api';

function* getAppData(action) {
  const { request } = action;
  console.log('request====', request);
  const requestParam = {
    pageStart: 1,
    pageSize: 1000000,
    date: '20220511',
  };
  try {
    const data = yield call(Api.getAppData, requestParam);
    yield put({ type: APP_DATA, appData: data });
  } catch (e) {
    yield put({ type: APP_ERR, appErr: e.message });
  }
}

function* App() {
  yield takeEvery(FETCH_APP_DATA, getAppData);
}

export default App;
