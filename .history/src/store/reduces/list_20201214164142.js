import { ADD_ITEM } from '../action';

export function list(list = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...list, action.item];
    default:
      return list;
  }
}
