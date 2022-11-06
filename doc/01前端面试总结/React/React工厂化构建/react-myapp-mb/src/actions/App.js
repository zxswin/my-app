export const APP_CONFIG = 'APP_CONFIG';
export const APP_ERROR = 'APP_ERROR';
export const APP_AGENT_DATA = 'APP_AGENT_DATA';
export const FETCH_APP_CONFIG = 'FETCH_APP_CONFIG';
export const APP_HISTORY = 'APP_HISTORY';
export const HAVE_COPY_ORDER_LIST = 'HAVE_COPY_ORDER_LIST';
export const FETCH_AGENT_DATA = 'FETCH_AGENT_DATA';

// 设置路由跳转函数
export function setHistory(history) {
  return {
    type: APP_HISTORY,
    history,
  };
}

// 弹出窗口数据
export const GLOBAL_POPUP_DATA = 'GLOBAL_POPUP_DATA';

export function fetchAppConfig(data) {
  return {
    type: FETCH_APP_CONFIG,
    data,
  };
}

// 设置弹出窗口数据
export function setGlobalPopupData(popupData) {
  return {
    type: GLOBAL_POPUP_DATA,
    popupData,
  };
}

// 设置是否已经点击国复制按钮
export function setHaveCopyOrderList(haveCopyOrderList) {
  return {
    type: HAVE_COPY_ORDER_LIST,
    haveCopyOrderList,
  };
}

// 获取代理用户数据
export function getAppAgentData(request) {
  return {
    type: FETCH_AGENT_DATA,
    request,
  };
}
