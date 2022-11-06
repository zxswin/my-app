import { APP_CONFIG, APP_ERROR, GLOBAL_POPUP_DATA, APP_HISTORY, HAVE_COPY_ORDER_LIST, APP_AGENT_DATA } from '../actions/App';

const initState = {
  history: null,
  appConfig: {},
  appError: '',
  popupData: {
    isShow: false, // 是否展示
    info: '', // 弹出框文本信息
    type: 'confirm', // 类型 confirm确认框  tip 提示框
    close: () => {}, // 点击关闭按钮的回调函数
    confirm: () => {}, // 点击确认按钮后的回调函数
  },
  haveCopyOrderList: false, // 是否已经点击了复制订单按钮
  appAgentData: {}, // 代理用户数据
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case APP_CONFIG:
      const { appConfig } = action.data;
      return { ...state, appConfig };
    case APP_ERROR:
      const { appError } = action.err;
      return { ...state, appError };
    case GLOBAL_POPUP_DATA:
      const { popupData } = action;
      return { ...state, popupData };
    case APP_HISTORY:
      const { history } = action;
      return { ...state, history };
    case HAVE_COPY_ORDER_LIST:
      const { haveCopyOrderList } = action;
      return { ...state, haveCopyOrderList };
    case APP_AGENT_DATA:
      const { appAgentData } = action;
      return { ...state, appAgentData };
    default:
      return state;
  }
};

export default reducer;
