import { getApp, getApps, initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase-admin/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSfqOB7Wk1lFniEjcZPd4E9EyUCNSLvhk",
  authDomain: "prepwise-4e979.firebaseapp.com",
  projectId: "prepwise-4e979",
  storageBucket: "prepwise-4e979.firebasestorage.app",
  messagingSenderId: "227012243196",
  appId: "1:227012243196:web:ea2fed6621fdeb7b2bf179",
  measurementId: "G-Q96QCT3F80",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
