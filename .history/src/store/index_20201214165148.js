import { createStore } from 'redux';
import totalReducers from './reduces/index';

/**
 * store 初始值
 */
const initStateData = {
  list: [],
  showOpInfo: '',
};

const store = createStore(totalReducers, initStateData);

export default store;
