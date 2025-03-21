import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAH-5LX1Zc7_PjXGxkh6J7T4Fkujt6zDU",
  authDomain: "cinehome-5f270.firebaseapp.com",
  projectId: "cinehome-5f270",
  storageBucket: "cinehome-5f270.firebasestorage.app",
  messagingSenderId: "868837008713",
  appId: "1:868837008713:web:eafca577b91dc597ab6698",
  measurementId: "G-48GZV7VTB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();