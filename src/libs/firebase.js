// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVfupMVgk_O8yELlfpz1RL8wfrii9km2g",
  authDomain: "piggy-bank-app-62352.firebaseapp.com",
  databaseURL: "https://piggy-bank-app-62352-default-rtdb.firebaseio.com",
  projectId: "piggy-bank-app-62352",
  storageBucket: "piggy-bank-app-62352.appspot.com",
  messagingSenderId: "246776121932",
  appId: "1:246776121932:web:17e669bdc8e794610042e9",
  measurementId: "G-N3K17TJ0J7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
