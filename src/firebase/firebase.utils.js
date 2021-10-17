import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
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
  const userRef = doc(firestore, 'users', 'lwiV01TXqroRGSSGQ8DF');
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
    console.log('Document snapshop:', docSnap);
    console.log('docRef:', userRef.firestore);

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    const docData = {
      displayName,
      email,
      createdAt,
      ...additionalData,
    };
    console.log(docData);
    try {
      await addDoc(collection(firestore, 'users'), docData);
    } catch (err) {
      console.log('Error creating user', err.message);
    }
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
  return userRef;
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp); //db firestore

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebaseApp;
