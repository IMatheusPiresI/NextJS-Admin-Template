// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "admin-3ae64.appspot.com",
  messagingSenderId: "285127970262",
  appId: "1:285127970262:web:9e51e666140af6f241e877"
};

// Initialize Firebase
export const firebaseAppInitialize = () => initializeApp(firebaseConfig);