import { createStore } from 'redux';

const initStateData = {
  count: 0,
};

function counter(state = initStateData, action) {
  const count = state.count;
  switch (action.type) {
    case 'increase':
      return { count: count + 1 };
    default:
      return state;
  }
}
