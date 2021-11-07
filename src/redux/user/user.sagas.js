import { signInWithPopup } from '@firebase/auth';
import { getDoc } from '@firebase/firestore';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import UserActionTypes from './user.types';

import { googleSignInSuccess, googleSignInFailure } from './user.actions';

import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from '../../firebase/firebase.utils';

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapShot = yield getDoc(userRef);
    yield put(
      googleSignInSuccess({
        id: userSnapShot.id,
        ...userSnapShot.data(),
      })
    );
  } catch (error) {
    yield put(googleSignInFailure, error);
  }
}
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
