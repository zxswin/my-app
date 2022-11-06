import { APP_DATA, APP_ERR } from '../actions/App';

const initState = {
  appData: {},
  appErr: '',
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case APP_DATA:
      const appData = action.appData;
      console.log('appData...', appData);
      return { ...state, appData };
    case APP_ERR:
      const appErr = action.appErr;
      console.log('appErr...', appErr);
      return { ...state, appErr };
    default:
      return state;
  }
};

export default reducer;
