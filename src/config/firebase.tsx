// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXFUnYP6MDr_E_G59HnG4nhxkBv6uSgSE",
  authDomain: "todo-7632c.firebaseapp.com",
  projectId: "todo-7632c",
  storageBucket: "todo-7632c.appspot.com",
  messagingSenderId: "466976857763",
  appId: "1:466976857763:web:f207e732fa9ce9852ca916",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const ref = firebase.database().ref();

export default app;
