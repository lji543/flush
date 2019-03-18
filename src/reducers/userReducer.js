import * as userActions from '../actions/userActions';

const defaultState = [];

export default (state = defaultState, { type, payload, user }) => {
  switch (type) {
    case userActions.FETCH_ALL_USERS:
      return payload.users;
    case userActions.ADD_USER:
      return state;
    case userActions.DELETE_USER:
      return state;
    case userActions.RETURN_USER:
      return state;
    case userActions.SAVE_USER:
      console.log(user);
      return user;
    default:
      return state;
  }
};
