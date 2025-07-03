import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleAuthProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleAuthProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    const { displayName, email, photoURL, uid } = user;

    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return { ok: false, errorMessage, errorCode };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return { ok: true, uid, photoURL, email, displayName };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
      errorCode: error.code,
    };
  }
};

export const loginWithEmailPassword = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;

    return { ok: true, uid, photoURL, email, displayName };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
      errorCode: error.code,
    };
  }
};
