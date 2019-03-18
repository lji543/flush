import { combineReducers } from 'redux';
import users from './userReducer';
import auth from './authReducer';
import form from './formReducer';

export default combineReducers({
  users,
  auth,
  form,
});
