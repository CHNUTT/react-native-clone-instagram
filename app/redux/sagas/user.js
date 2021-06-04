import { call, put, takeLatest, all } from 'redux-saga/effects';
import { userActionTypes } from '../actionTypes';
import { userActions } from '../actions';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {
  createUserProfileDocument,
  getCurrentUser,
  getUserSnapshot,
} from '../utils/firebase';

// TODO: Need refector sing in success part //

// TOPIC: SIGNUP //

function* handleOnSignUp({ payload: { name, email, password } }) {
  try {
    yield console.log('signup');
    const { user: userAuth } = yield firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    if (!userAuth) throw new Error('Internal Server Error');

    const snapshot = yield createUserProfileDocument(userAuth, name);

    // INFO: Sign in afrer sign up //
    if (!snapshot.exists) throw new Error('User does not exist');
    yield put(
      userActions.userSignInSuccess({ id: snapshot.id, ...snapshot.data() })
    );
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
    const { user: userAuth } = yield firebase
      .auth()
      .signInWithEmailAndPassword(email.toLowerCase(), password);
    if (!userAuth) throw new Error('Invalid Credentials');

    // INFO: Get user from database to get name | need name, email, uid //
    const snapshot = yield getUserSnapshot(userAuth);
    if (!snapshot.exists) throw new Error('User does not exist');
    yield put(
      userActions.userSignInSuccess({ id: snapshot.id, ...snapshot.data() })
    );
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

    const snapshot = yield getUserSnapshot(userAuth);
    if (!snapshot.exists) throw new Error('User does not exist');
    yield put(
      userActions.userSignInSuccess({ id: snapshot.id, ...snapshot.data() })
    );
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
