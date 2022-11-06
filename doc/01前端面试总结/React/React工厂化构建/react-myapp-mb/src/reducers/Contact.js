import { USER_INFO } from '../actions/Contact';

const initState = {
  userInfo: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case USER_INFO:
      const { userInfo } = action.userInfo;
      return { ...state, userInfo };
    default:
      return state;
  }
};

export default reducer;
