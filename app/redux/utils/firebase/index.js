import firebase from 'firebase/app';
import { firebaseConfig } from '../../../configs/firebase';

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export { createUserProfileDocument, getCurrentUser } from './auth';
export default firebase;
