// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 🆕

const firebaseConfig = {
  apiKey: "AIzaSyAPbEU41gyUUFE65q5LtDBfgS2XP2OQDw0",
  authDomain: "pet-adoption-993f3.firebaseapp.com",
  projectId: "pet-adoption-993f3",
  storageBucket: "pet-adoption-993f3.firebasestorage.app",
  messagingSenderId: "995231277476",
  appId: "1:995231277476:web:7db6cfdda970b79980e131",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Auth (already working — do not change)
export const auth = getAuth(app);

// 🗃️ Firestore (NEW — for adoption applications)
export const db = getFirestore(app);
