// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCxk9Q5WE-nllGPFB7h-mWeWANdHXEq9QE",
  authDomain: "fir-basics-f257e.firebaseapp.com",
  projectId: "fir-basics-f257e",
  storageBucket: "fir-basics-f257e.appspot.com",
  messagingSenderId: "483346707749",
  appId: "1:483346707749:web:48d1c622c91f69c1fdd6cc",
  measurementId: "G-MW9LC0H1W5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);