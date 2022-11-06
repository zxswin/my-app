import { all } from 'redux-saga/effects';
import App from './App';
import Contact from './Contact';

export default function* root() {
  yield all([App(), Contact()]);
}
