import { userActionTypes } from '../actionTypes';

export const userSignUpStart = (userCredential) => ({
  type: userActionTypes.USER_SIGNUP_START,
  payload: userCredential,
});

export const userSignUpSuccess = (user) => ({
  type: userActionTypes.USER_SIGNUP_SUCCESS,
  payload: user,
});

export const userSignUpFailure = (errMessage) => ({
  type: userActionTypes.USER_SIGNUP_FAILURE,
  payload: errMessage,
});

export const userSignInStart = (email, password) => ({
  type: userActionTypes.USER_SIGNIN_START,
  payload: { email, password },
});

export const userSignInSuccess = (user) => ({
  type: userActionTypes.USER_SIGNIN_SUCCESS,
  payload: user,
});

export const userSignInFailure = (errMessage) => ({
  type: userActionTypes.USER_SIGNIN_FAILURE,
  payload: errMessage,
});

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION,
});
