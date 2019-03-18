
import { region, accessKeyId, secretAccessKey, userPoolId } from '../constants';

export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const FILTER_USER_NAMES = 'FILTER_NAMES';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const RETURN_USER = 'RETURN_USER';
export const SAVE_USER = 'SAVE_PROFILE';

export const addUser = user => {
  // TODO [lji] fill out this and other form actions
  return {
    type: ADD_USER,
    user,
  };
};

export const saveUser = user => {
  // TODO [lji] fill out this and other form actions
  return {
    type: SAVE_USER,
    user,
  };
};

export const deleteUser = user => {
  // TODO [lji] fill out this and other form actions
  return {
    type: DELETE_USER,
    user,
  };
};

export const returnUser = user => {
  return {
    type: RETURN_USER,
    user,
  };
};
// 
// const cognitoIdentityService = new CognitoIdentityServiceProvider({
//   region,
//   accessKeyId,
//   secretAccessKey,
// });

const params = {
  UserPoolId: userPoolId,
};
