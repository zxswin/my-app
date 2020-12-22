/**
 * 创建action常量
 */
export const ADD_ITEM = 'ADD_ITEM';

/**
 * 创建action函数
 */
export function addItem(item) {
  return { type: ADD_ITEM, item };
}

export const SHOW_OP_INFO = 'SHOW_OP_INFO';

export function showOpInfo(info) {
  return { type: SHOW_OP_INFO, info };
}
