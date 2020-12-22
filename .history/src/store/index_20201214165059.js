import { createStore } from 'redux';
import totalReducers from './reduces/index';

const initStateData = {
  list: [],
  showOpInfo: '',
};

const store = createStore(totalReducers);

export default store;
