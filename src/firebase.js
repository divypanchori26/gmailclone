import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA16X0qBm52D1FmLYAfI_n8_gZUEsFCfJI",
  authDomain: "clone-9b0fa.firebaseapp.com",
  projectId: "clone-9b0fa",
  storageBucket: "clone-9b0fa.firebasestorage.app",
  messagingSenderId: "804501457046",
  appId: "1:804501457046:web:c735a63891945aefc81ab7",
  measurementId: "G-BGY4FG5KK8"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();