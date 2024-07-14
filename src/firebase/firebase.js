// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArGjGTbI8ali4Fk4TUN-QqQLtkXFefKUI",
  authDomain: "internarea-593a0.firebaseapp.com",
  projectId: "internarea-593a0",
  storageBucket: "internarea-593a0.appspot.com",
  messagingSenderId: "429725577568",
  appId: "1:429725577568:web:a9d684efb6a739f9636e05",
  measurementId: "G-7F318JV8QC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {auth,provider}