import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4CEaopC5GiylLq3XjikaDFl0RjoHUQmM",
  authDomain: "classpages-da6ea.firebaseapp.com",
  projectId: "classpages-da6ea",
  storageBucket: "classpages-da6ea.firebasestorage.app",
  messagingSenderId: "1063369301604",
  appId: "1:1063369301604:web:f99bf87a14831afd630971"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
