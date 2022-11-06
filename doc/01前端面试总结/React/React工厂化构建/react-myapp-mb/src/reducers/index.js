import { combineReducers } from 'redux';

import App from './App';
import Contact from './Contact';
import DriedFood from './DriedFood';
import ProductLists from './ProductLists';
import ProdPage from './ProdPage';
import HotSale from './HotSale';
import Agent from './Agent';

const totalReducers = combineReducers({
  App,
  Contact,
  DriedFood,
  ProductLists,
  ProdPage,
  HotSale,
  Agent,
});

export default totalReducers;
