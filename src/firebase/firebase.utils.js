import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  writeBatch,
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

  const userRef = doc(firestore, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userRef);

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
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(firestore, collectionKey);
  // console.log(collectionRef);

  //? Creates a write batch, used for performing multiple writes as a single atomic operation
  const batch = writeBatch(firestore);
  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef);
    // console.log(newDocRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionSnapshopToMap = collections => {
  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      id: doc.id,
      title,
      routeName: encodeURI(title.toLowerCase()),
      items,
    };
  });
  return transformedCollections.reduce((accumalator, collection) => {
    accumalator[collection.title.toLowerCase()] = collection;
    return accumalator;
  }, {});
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp); //db firestore

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export default firebaseApp;
