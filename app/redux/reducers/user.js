import { userActionTypes } from '../actionTypes';

const initialState = {
  currentUser: null,
  loaded: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loaded: false,
        currentUser: action.payload,
      };
    case userActionTypes.USER_SIGNIN_FAILURE:
    case userActionTypes.USER_SIGNUP_FAILURE:
      return {
        ...state,
        loaded: false,
        currentUser: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
