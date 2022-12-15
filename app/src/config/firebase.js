import firebase from "firebase";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-RDqc9uiv1rcE3OJTjIQ3FDWDT5RM3yQ",
  authDomain: "olex-clone-fd70e.firebaseapp.com",
  projectId: "olex-clone-fd70e",
  storageBucket: "olex-clone-fd70e.appspot.com",
  messagingSenderId: "79155006761",
  appId: "1:79155006761:web:e8a7ceb3d70016bd9efb38",
  measurementId: "G-PG6Y3K433Z",
};

export const Firebase = firebase.initializeApp(firebaseConfig);
