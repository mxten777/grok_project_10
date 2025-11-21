// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFgQZcMhkqdK_4hadm8cSqig7Yo8u8jsg",
  authDomain: "grok-project-10.firebaseapp.com",
  projectId: "grok-project-10",
  storageBucket: "grok-project-10.firebasestorage.app",
  messagingSenderId: "399366044016",
  appId: "1:399366044016:web:206d2f1222991d6f4777b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);