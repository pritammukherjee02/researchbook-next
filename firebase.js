import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAJGKHZwJOeMLQp38dsSRAyT2msJL0hhLY",
  authDomain: "researchbook-production.firebaseapp.com",
  projectId: "researchbook-production",
  storageBucket: "researchbook-production.appspot.com",
  messagingSenderId: "116243112671",
  appId: "1:116243112671:web:b901fda881964b1b057f6a",
  measurementId: "G-Z12SMPKJLQ"
};


//const application = apps.length ? initializeApp(firebaseConfig) : app()
const app = initializeApp(firebaseConfig)

const db = getFirestore(app) // DATABASE <- QUICK-FIND LABEL
const storage = getStorage(app) // STORAGE <- QUICK-FIND LABEL

//const analytics = getAnalytics(app);

export { db, storage }