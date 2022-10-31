import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDVNsinzvnBMAd0ZS4gr3judv7-lxNcp5o",
  authDomain: "ecommerce--nashtech.firebaseapp.com",
  projectId: "ecommerce--nashtech",
  storageBucket: "ecommerce--nashtech.appspot.com",
  messagingSenderId: "398947957517",
  appId: "1:398947957517:web:763ea20c98695d586a8e44",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFileStorage = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { projectStorage, projectFileStorage, timestamp };
