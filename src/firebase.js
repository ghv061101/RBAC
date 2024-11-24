// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { getAnalytics } from "firebase/analytics"; // Optional: Firebase Analytics

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB4n-FLa91rY6DXifAGPfrijiL23Yy3Bso",
  authDomain: "rbaco-d22e5.firebaseapp.com",
  projectId: "rbaco-d22e5",
  storageBucket: "rbaco-d22e5.firebasestorage.app",
  messagingSenderId: "310539019980",
  appId: "1:310539019980:web:d55332255792104cd84469",
  measurementId: "G-N8VSTH306D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Optional: Initialize Firebase Analytics
const analytics = getAnalytics(app);

export { auth };
