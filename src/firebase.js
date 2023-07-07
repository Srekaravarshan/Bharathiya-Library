import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCux3tuBNh5O03vuaQWzqA1zIWz_13sSeQ",
  authDomain: "bharathiya-library.firebaseapp.com",
  projectId: "bharathiya-library",
  storageBucket: "bharathiya-library.appspot.com",
  messagingSenderId: "927989980167",
  appId: "1:927989980167:web:35ed67e8a0af8f1a8a9ea2",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const authentication = getAuth();
const signOutV = signOut;
const onAuthStateChangedV = onAuthStateChanged;
const createUserWithEmailAndPasswordV = createUserWithEmailAndPassword;
const signInWithEmailAndPasswordV = signInWithEmailAndPassword;
const googleAuthProvider = new GoogleAuthProvider();

export {
  db,
  authentication,
  signOutV,
  onAuthStateChangedV,
  createUserWithEmailAndPasswordV,
  signInWithEmailAndPasswordV,
  signInWithPopup,
  googleAuthProvider
};
