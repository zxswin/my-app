import { PROD_PAGE_DATA } from '../actions/ProdPage';
const initState = {
  prodPageData: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case PROD_PAGE_DATA:
      const { prodPageData } = action;
      return { ...state, prodPageData };
    default:
      return state;
  }
};

export default reducer;
