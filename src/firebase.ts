// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLmCv3F2A1mv6AqXNwVQIsh-G9bgWMumk",
  authDomain: "get-tutr.firebaseapp.com",
  projectId: "get-tutr",
  storageBucket: "get-tutr.appspot.com",
  messagingSenderId: "294956674386",
  appId: "1:294956674386:web:108040a52f0a4718f11e8b",
  measurementId: "G-F92045QMYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const firestore = getFirestore(app)
export {auth,db,storage,firestore}
