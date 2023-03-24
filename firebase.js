/* import firebase from 'firebase'

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWHqGNUamMvYzQ1IH6khsCFCNofzgMXSM",
  authDomain: "rn-instagram-clone-4f22d.firebaseapp.com",
  projectId: "rn-instagram-clone-4f22d",
  storageBucket: "rn-instagram-clone-4f22d.appspot.com",
  messagingSenderId: "946952474077",
  appId: "1:946952474077:web:bb59b219b6f6cac147fa34"
};

// Initialize Firebase
!firebaseConfig.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase */

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// Your web app's Firebase configuration
const config = {
  //your config json file
  apiKey: "AIzaSyDWHqGNUamMvYzQ1IH6khsCFCNofzgMXSM",
  authDomain: "rn-instagram-clone-4f22d.firebaseapp.com",
  projectId: "rn-instagram-clone-4f22d",
  storageBucket: "rn-instagram-clone-4f22d.appspot.com",
  messagingSenderId: "946952474077",
  appId: "1:946952474077:web:bb59b219b6f6cac147fa34"
};


firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();


export default firebase;