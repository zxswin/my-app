import { all } from 'redux-saga/effects';

import App from './App';
import ProductLists from './ProductLists';
import ProdPageData from './ProdPageData';

export default function* root() {
  yield all([App(), ProductLists(), ProdPageData()]);
}
