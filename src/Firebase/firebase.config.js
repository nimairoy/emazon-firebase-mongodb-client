// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIDMDE_Av09rN5roLMDmzxnCOWKtJfPlM",
  authDomain: "router-react-emazon-firebase.firebaseapp.com",
  projectId: "router-react-emazon-firebase",
  storageBucket: "router-react-emazon-firebase.appspot.com",
  messagingSenderId: "588157289043",
  appId: "1:588157289043:web:4c12a5effefcc11ef3bca6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;