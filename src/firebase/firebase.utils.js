import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAcIFFCNBZfIK0wNOYqWfINSgBnn94HK4g',
  authDomain: 'crown-clothing-d09fb.firebaseapp.com',
  projectId: 'crown-clothing-d09fb',
  storageBucket: 'crown-clothing-d09fb.appspot.com',
  messagingSenderId: '17493049805',
  appId: '1:17493049805:web:2684d59062b65bc63e8484',
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp); //db

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebaseApp;
