// Import the Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration (get it from your Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyCeeiDOxZhFZ_3l4cOgGdt21uBv_b4JL8Y",
    authDomain: "classify-unicorn.firebaseapp.com",
    projectId: "classify-unicorn",
    storageBucket: "classify-unicorn.appspot.com",
    messagingSenderId: "884326557382",
    appId: "1:884326557382:web:895d548587f5106e8959c7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
