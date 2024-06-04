// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mern-estate-b9454.firebaseapp.com",
  projectId: "mern-estate-b9454",
  storageBucket: "mern-estate-b9454.appspot.com",
  messagingSenderId: "241992531876",
  appId: "1:241992531876:web:e1aeb8e5a1731bff924b31"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);