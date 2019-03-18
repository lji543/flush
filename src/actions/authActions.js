export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_USER_ATTRS = 'SET_USER_ATTRS';
export const LOGOUT = 'LOGOUT';

export const setAccessToken = accessToken => ({
  type: SET_ACCESS_TOKEN,
  payload: { accessToken },
});

export const setUserAttrs = attrs => ({
  type: SET_USER_ATTRS,
  payload: { attrs },
});

export const logout = () => ({
  type: LOGOUT,
});
