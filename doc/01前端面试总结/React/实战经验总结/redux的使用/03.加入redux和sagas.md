## 加入 redux 和 sagas

- 第一步先安装相关依赖

```js
// 第一步先安装相关依赖
// "react-redux": "^7.2.3",
// "redux": "^4.0.5",
// "redux-saga": "^1.1.3",

// npm i redux-saga@1.1.3 -S
```

- 新建 action 文件夹 创建 App.js

```js
export const APP_DATA = 'APP_DATA';
export const FETCH_APP_DATA = 'FETCH_APP_DATA';
export const APP_ERR = 'APP_ERR';

export function setAppData(appData) {
  return {
    type: APP_DATA,
    appData,
  };
}

export function setAppErr(appErr) {
  return {
    type: APP_ERR,
    appErr,
  };
}

export function fetchAppData(request) {
  return {
    type: FETCH_APP_DATA,
    request,
  };
}
```

## 创建 reducers 文件夹

- 创建 App.js

```js
import { APP_DATA, APP_ERR } from '../actions/App';

const initState = {
  appData: {},
  appErr: '',
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case APP_DATA:
      const appData = action.appData;
      console.log('appData...', appData);
      return { ...state, appData };
    case APP_ERR:
      const appErr = action.appErr;
      console.log('appErr...', appErr);
      return { ...state, appErr };
    default:
      return state;
  }
};

export default reducer;
```

- 创建 index.js

```js
import { combineReducers } from 'redux';

import App from './App';
import Contact from './Contact';

const totalReducers = combineReducers({
  App,
  Contact,
});

export default totalReducers;
```

## 创建 sagas 文件夹

- 创建 App.js

```js
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
```

- 创建 index.js

```js
import { all } from 'redux-saga/effects';
import App from './App';
import Contact from './Contact';

export default function* root() {
  yield all([App(), Contact()]);
}
```

## 创建 store 文件夹

- 创建 index.js 文件

```js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import totalReducers from '../reducers';
import RootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

// store 初始化数据
const initState = {};

const store = createStore(totalReducers, initState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(RootSaga);

export default store;
```

## 在 index 文件中引入 store

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './containers/App';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
```
