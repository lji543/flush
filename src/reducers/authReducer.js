import { SET_ACCESS_TOKEN, SET_USER_ATTRS, LOGOUT } from '../actions/authActions';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: payload.accessToken };
    case SET_USER_ATTRS:
      return { ...state, ...payload.attrs };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
