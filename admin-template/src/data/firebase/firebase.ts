// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "projeto-template-ef7ca.appspot.com",
  messagingSenderId: "1064157268963",
  appId: "1:1064157268963:web:2a10d0d33d9221fe8d6ed6"
};

// Initialize Firebase
export const firebaseAppInitialize = () => initializeApp(firebaseConfig);