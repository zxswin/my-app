import { combineReducers } from 'redux';

import App from './App';
import Contact from './Contact';

const totalReducers = combineReducers({
  App,
  Contact,
});

export default totalReducers;
