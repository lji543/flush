import { ADD_USER, RETURN_USER, SAVE_USER, DELETE_USER } from '../actions/userActions';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_USER:
      // TODO [lji] fill out this and other form actions
      return state;
    case SAVE_USER:
      // TODO [lji] fill out this and other form actions
      return state;
    case DELETE_USER:
      // TODO [lji] fill out this and other form actions
      console.log('formReducer ', state, action);
      return state;
    case RETURN_USER:
      // console.log('formReducer ', action.user);
      // TODO [lji] should we reconfigure the "action" here so we can return state?
      return {
        ...state,
        currentUserProfile: action.user,
      };
    default:
      return state;
  }
};
