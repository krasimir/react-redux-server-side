import { USERS_FETCHED } from './constants';

function getInitialState() {
  if (typeof window !== 'undefined' && window.__APP_STATE) {
    return window.__APP_STATE;
  }
  return { users: null };
}

const reducer = function (oldState = getInitialState(), action) {
  if (action.type === USERS_FETCHED) {
    return { users: action.response.data };
  }
  return oldState;
};

export default reducer;