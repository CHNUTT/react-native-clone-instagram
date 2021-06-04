import { auth, firestore } from './index';

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   const userRef = firestore.doc(`users/${userAuth.uid}`);

//   const snapShot = await userRef.get();

//   if (!snapShot.exists) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();
//     try {
//       await userRef.set({
//         displayName,
//         email,
//         createdAt,
//         ...additionalData,
//       });
//     } catch (error) {
//       console.log('error creating user', error.message);
//     }
//   }

//   return userRef;
// };

export const createUserProfileDocument = async (userAuth, name) => {
  if (!userAuth || !name) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const { email } = userAuth;
  const createdAt = new Date();
  try {
    await userRef.set({
      name,
      email,
      createdAt,
    });
  } catch (error) {
    console.log('error creating user', error.message);
  }
  return userRef.get();
};

export const getUserSnapshot = async (userAuth) => {
  if (!userAuth) return;
  console.log(userAuth.uid);
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = userRef.get();
  return snapShot;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      console.log(userAuth);
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
