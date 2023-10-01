// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa4DbFxyLY9Y1Wfn9tWbHyYu3xaH-VqWc",
  authDomain: "fileupload-c2ad4.firebaseapp.com",
  projectId: "fileupload-c2ad4",
  storageBucket: "fileupload-c2ad4.appspot.com",
  messagingSenderId: "388904194049",
  appId: "1:388904194049:web:8827f1ebc52ea853d6b000",
  measurementId: "G-59LBYVT9B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export const db =getFirestore();
export {storage};