import { createStore, applyMiddleware } from 'redux';
import totalReducers from './reduces/index';
import thunkMiddleware from 'redux-thunk';

/**
 * store 初始值
 */
const initStateData = {
  list: [],
  showOpInfo: '',
};

const store = createStore(totalReducers, initStateData, applyMiddleware(thunkMiddleware));

export default store;
