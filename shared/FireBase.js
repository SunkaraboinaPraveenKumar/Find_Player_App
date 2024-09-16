// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "findplayerappprav.firebaseapp.com",
  projectId: "findplayerappprav",
  storageBucket: "findplayerappprav.appspot.com",
  messagingSenderId: "803992914955",
  appId: "1:803992914955:web:40416ddf9e8c3d76ec8b0e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);