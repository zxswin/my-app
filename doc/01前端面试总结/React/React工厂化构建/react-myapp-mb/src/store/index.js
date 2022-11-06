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
