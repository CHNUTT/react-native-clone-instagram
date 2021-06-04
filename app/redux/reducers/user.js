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
    case userActionTypes.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case userActionTypes.USER_SIGNIN_FAILURE:
    case userActionTypes.USER_SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
