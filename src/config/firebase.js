import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaZN-fYJxpRygCBly1UfC-tiXbwXtiazA",
  authDomain: "where-s-the-pokemon.firebaseapp.com",
  projectId: "where-s-the-pokemon",
  storageBucket: "where-s-the-pokemon.appspot.com",
  messagingSenderId: "909202678724",
  appId: "1:909202678724:web:cbadf0bdac1b54df213a91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);