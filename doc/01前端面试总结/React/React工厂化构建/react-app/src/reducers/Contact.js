import { CONTACT_DATA } from '../actions/Contact';

const initState = {
  concatData: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case CONTACT_DATA:
      const concatData = action.userInfo;
      return { ...state, concatData };
    default:
      return state;
  }
};

export default reducer;
