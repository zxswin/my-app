export const APP_DATA = 'APP_DATA';
export const FETCH_APP_DATA = 'FETCH_APP_DATA';
export const APP_ERR = 'APP_ERR';

export function setAppData(appData) {
  return {
    type: APP_DATA,
    appData,
  };
}

export function setAppErr(appErr) {
  return {
    type: APP_ERR,
    appErr,
  };
}

export function fetchAppData(request) {
  return {
    type: FETCH_APP_DATA,
    request,
  };
}
