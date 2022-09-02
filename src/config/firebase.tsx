// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import "firebase/auth";
import "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXFUnYP6MDr_E_G59HnG4nhxkBv6uSgSE",
  authDomain: "todo-7632c.firebaseapp.com",
  projectId: "todo-7632c",
  storageBucket: "todo-7632c.appspot.com",
  messagingSenderId: "466976857763",
  appId: "1:466976857763:web:f207e732fa9ce9852ca916",
  databaseURL: "https://todo-7632c-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;
