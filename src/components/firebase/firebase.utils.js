import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
  apiKey: "AIzaSyBSrp50QNNUBYC6uG6LKH8RXSJM3prdDuk",
  authDomain: "crwn-db-4bdc9.firebaseapp.com",
  projectId: "crwn-db-4bdc9",
  storageBucket: "crwn-db-4bdc9.appspot.com",
  messagingSenderId: "838985724974",
  appId: "1:838985724974:web:fe5a4637d51fa73140dbbf",
  measurementId: "G-TJY7F6PP3D"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
