import { userActionTypes } from '../actionTypes';

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        loading: true,
        currentUser: null,
        error: null,
      };
    case userActionTypes.USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case userActionTypes.USER_SIGN_IN_FAILURE:
    case userActionTypes.USER_SIGN_UP_FAILURE:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload,
      };
    case userActionTypes.USER_SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case userActionTypes.USER_SIGN_OUT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
