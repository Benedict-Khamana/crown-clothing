import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
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

  const { displayName, email } = userAuth;
  const createdAt = new Date();
  const docData = {
    displayName,
    email,
    createdAt,
    ...additionalData,
  };
  console.log('docData:', docData);
  try {
    const userRef = await addDoc(collection(firestore, 'users'), docData);
    console.log('userRef:', userRef);

    console.log('Document written with ID: ', userRef.id);

    //GET DATA => DocumentSnapshot<any>
    // const docSnap = await getDoc(userRef);

    // if (docSnap.exists()) {
    //   console.log('Document data:', docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log('No such document!');
    // }
    return userRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp); //db firestore

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebaseApp;
