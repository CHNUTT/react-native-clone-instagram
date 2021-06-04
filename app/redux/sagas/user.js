import { call, put, takeLatest, all } from 'redux-saga/effects';
import { userActionTypes } from '../actionTypes';
import { userActions } from '../actions';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// TOPIC: SIGNUP

function* handleOnSignUp({ payload: { name, email, password } }) {
  try {
    yield console.log('signup');
    const result = yield firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    if (!result) throw new Error('Internal Server Error');
    const user = yield firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .set({ name, email });
    console.log(user);
  } catch (err) {
    console.log(err);
    yield userActions.userSignUpFailure(err);
  }
}

function* onSingUp() {
  yield takeLatest(userActionTypes.USER_SIGNUP_START, handleOnSignUp);
}

// TOPIC: CHECK USER SESSION

function* handleCheckUserSession() {
  try {
    const uid = yield firebase.auth().currentUser.uid;
    if (!uid) throw new Error('Not logged in yet');
    const snapshot = yield firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get();
    if (snapshot.exists)
      yield put(userActions.userSignInSuccess(snapshot.data()));
    else throw new Error('Does not exist');
  } catch (err) {
    console.log(err);
    const { msg } = err;
    yield put(userActions.userSignUpFailure(msg));
  }
}

function* onCheckUSerSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, handleCheckUserSession);
}

export default function* userSagas() {
  yield all([call(onCheckUSerSession), call(onSingUp)]);
}
