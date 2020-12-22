import { SHOW_OP_INFO } from '../action';

export default function showOpinfo(info = '', action) {
  switch (action.type) {
    case SHOW_OP_INFO:
      return `第${action.info.sort}条数据被点击了`;
    default:
      return info;
  }
}
