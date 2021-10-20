import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAcIFFCNBZfIK0wNOYqWfINSgBnn94HK4g',
  authDomain: 'crown-clothing-d09fb.firebaseapp.com',
  projectId: 'crown-clothing-d09fb',
  storageBucket: 'crown-clothing-d09fb.appspot.com',
  messagingSenderId: '17493049805',
  appId: '1:17493049805:web:2684d59062b65bc63e8484',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // console.log('createUserProfileDocument => userAuth.uid', userAuth.uid);

  const userRef = doc(firestore, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userRef);

  // const userCollectionRef = collection(firestore, 'users');
  // const userCollectionSnapShot = await getDocs(userCollectionRef);
  // console.log({
  //   collections: userCollectionSnapShot.docs.map(doc => doc.data()),
  // });

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const userDocData = {
      displayName,
      email,
      createdAt,
      ...additionalData,
    };

    try {
      await setDoc(userRef, userDocData);
    } catch (e) {
      console.error('Error creating user: ', e);
    }
  }
  return userRef;

  // const { displayName, email } = userAuth;
  // const createdAt = new Date();
  // const docData = {
  //   displayName,
  //   email,
  //   createdAt,
  //   ...additionalData,
  // };
  // // console.log('docData:', docData);
  // try {
  //   const userRef = await addDoc(collection(firestore, 'users'), docData);
  //   // console.log('userRef:', userRef);

  //   // console.log('Document written with ID: ', userRef.id);
  //   return userRef;
  // } catch (e) {
  //   console.error('Error adding document: ', e);
  // }
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp); //db firestore

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebaseApp;
