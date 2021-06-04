import { userActionTypes } from '../actionTypes';

export const userSignUpStart = ({ email, password, name }) => ({
  type: userActionTypes.USER_SIGN_UP_START,
  payload: { email, password, name },
});

export const userSignUpSuccess = (user) => ({
  type: userActionTypes.USER_SIGN_UP_SUCCESS,
  payload: user,
});

export const userSignUpFailure = (errMessage) => ({
  type: userActionTypes.USER_SIGN_UP_FAILURE,
  payload: errMessage,
});

export const userSignInStart = ({ email, password }) => ({
  type: userActionTypes.USER_SIGN_IN_START,
  payload: { email, password },
});

export const userSignInSuccess = (user) => ({
  type: userActionTypes.USER_SIGN_IN_SUCCESS,
  payload: user,
});

export const userSignInFailure = (errMessage) => ({
  type: userActionTypes.USER_SIGN_IN_FAILURE,
  payload: errMessage,
});

export const userSignOutStart = () => ({
  type: userActionTypes.USER_SIGN_OUT_START,
});

export const userSignOutSuccess = () => ({
  type: userActionTypes.USER_SIGN_OUT_SUCCESS,
});

export const userSignOutFailure = () => ({
  type: userActionTypes.USER_SIGN_OUT_FAILURE,
});

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION,
});
