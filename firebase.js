import firebase from "firebase";
import 'firebase/storage'
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


const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore() // DATABASE <- QUICK-FIND LABEL
const storage = firebase.storage()

//const analytics = getAnalytics(app);

export { db, storage }