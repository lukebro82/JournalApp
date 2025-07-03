// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBf_MYjUtjs2UQUmsilHd01E1toG1JWJI",
  authDomain: "react-curso-ef1a4.firebaseapp.com",
  projectId: "react-curso-ef1a4",
  storageBucket: "react-curso-ef1a4.firebasestorage.app",
  messagingSenderId: "892861205013",
  appId: "1:892861205013:web:51f1fc13ff91cefabc5c1c",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
