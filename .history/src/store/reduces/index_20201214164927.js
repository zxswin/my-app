import { combineReducers } from 'redux';

import list from './list';
import showOpInfo from './showOpinfo';

const totalReducers = combineReducers({
  list,
  showOpInfo,
});
