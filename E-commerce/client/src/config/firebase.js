import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBs4Nz1PyR6xqc_Zi8XuRhq06fMlpIfGOU",
  authDomain: "e-commerce005.firebaseapp.com",
  databaseURL: "https://e-commerce005-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-commerce005",
  storageBucket: "e-commerce005.firebasestorage.app",
  messagingSenderId: "429248435704",
  appId: "1:429248435704:web:3cf31f3f3551259b42320d",
  measurementId: "G-4XM2BEFC8J",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();