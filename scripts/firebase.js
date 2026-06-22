// scripts/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDf-1z_Vt3JMOaqSRxsJVI7dy7AUFlYfuU",
  authDomain: "digital-tarot-reader.firebaseapp.com",
  projectId: "digital-tarot-reader",
  storageBucket: "digital-tarot-reader.firebasestorage.app",
  messagingSenderId: "877580666601",
  appId: "1:877580666601:web:97a396e20b9fd86ffed278",
  measurementId: "G-0YK1QPVR3G",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app, "learninglinux");
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Database window bindings
window.db = db;
window.fsCollection = collection;
window.fsGetDocs = getDocs;
window.fsDoc = doc;
window.fsGetDoc = getDoc;
window.fsSetDoc = setDoc;

// Auth window bindings
window.auth = auth;
window.googleProvider = googleProvider;
window.signInWithPopup = signInWithPopup;
window.signOut = signOut;
window.onAuthStateChanged = onAuthStateChanged;
