// scripts/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
// Add the Firestore imports!
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDf-1z_Vt3JMOaqSRxsJVI7dy7AUFlYfuU",
  authDomain: "digital-tarot-reader.firebaseapp.com",
  projectId: "digital-tarot-reader",
  storageBucket: "digital-tarot-reader.firebasestorage.app",
  messagingSenderId: "877580666601",
  appId: "1:877580666601:web:97a396e20b9fd86ffed278",
  measurementId: "G-0YK1QPVR3G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Connect to the named Firestore database in this project.
const db = getFirestore(app, "learninglinux");
console.log("🔥 Firebase Hub Online! Connected to learninglinux database.");

// IMPORTANT: We attach these to the 'window' object so script.js can use them without breaking your UI!
window.db = db;
window.fsCollection = collection;
window.fsGetDocs = getDocs;
window.fsDoc = doc;
window.fsGetDoc = getDoc;
window.fsSetDoc = setDoc;
