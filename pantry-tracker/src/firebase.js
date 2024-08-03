// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEHKEeFlBjiX58WM5oYLasX7g3M0yCV4g",
  authDomain: "pantry-tracker-98c51.firebaseapp.com",
  projectId: "pantry-tracker-98c51",
  storageBucket: "pantry-tracker-98c51.appspot.com",
  messagingSenderId: "232464049357",
  appId: "1:232464049357:web:beead39f7245aaeb5e3584",
  measurementId: "G-M5L3MFV46G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export { firestore };
