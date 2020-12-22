import { ADD_ITEM } from '../action';

function list(list = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...list, action.item];
    default:
      return list;
  }
}
