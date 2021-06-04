import { call, put, takeLatest, all } from 'redux-saga/effects';
import { userActionTypes } from '../actionTypes';
import { userActions } from '../actions';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getCurrentUser } from '../utils/firebase';

// TOPIC: SIGNUP //

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
    yield put(userActions.userSignUpFailure(err));
  }
}

function* onSingUp() {
  yield takeLatest(userActionTypes.USER_SIGN_UP_START, handleOnSignUp);
}

// TOPIC: SINGIN //

function* handleOnSignIn({ payload: { email, password } }) {
  try {
    const result = yield firebase
      .auth()
      .signInWithEmailAndPassword(email.toLowerCase(), password);
    if (!result) throw new Error('Invalid Credentials');
    console.log(result.user);
    yield put(userActions.userSignInSuccess(result.user));
  } catch (error) {
    console.log(error);
    yield put(userActions.userSignInFailure(error));
  }
}

function* onSignIn() {
  yield takeLatest(userActionTypes.USER_SIGN_IN_START, handleOnSignIn);
}

// TOPIC: SIGNOUT //

function* handleOnSignOut() {
  try {
    yield firebase.auth().signOut();
    yield put(userActions.userSignOutSuccess());
  } catch (error) {
    console.log(error);
    yield put(userActions.userSignOutFailure(error));
  }
}

function* onSignOut() {
  yield takeLatest(userActionTypes.USER_SIGN_OUT_START, handleOnSignOut);
}

// TOPIC: CHECK USER SESSION //

function* handleCheckUserSession() {
  try {
    // const uid = yield firebase.auth().onAuthStateChanged();
    const userAuth = yield getCurrentUser();
    if (!userAuth) throw new Error('Not Authenticated');
    const snapshot = yield firebase
      .firestore()
      .collection('users')
      .doc(userAuth.uid)
      .get();
    if (snapshot.exists)
      yield put(
        userActions.userSignInSuccess({ id: snapshot.id, ...snapshot.data() })
      );
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
  yield all([
    call(onCheckUSerSession),
    call(onSingUp),
    call(onSignIn),
    call(onSignOut),
  ]);
}
