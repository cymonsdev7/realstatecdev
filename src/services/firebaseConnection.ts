import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// const firebaseConfig = {
//   apiKey: "AIzaSyBbJs4QEpNeV0ThhhYx7nJ1dVniZ2ZeRRk",
//   authDomain: "remaxauth1.firebaseapp.com",
//   projectId: "remaxauth1",
//   storageBucket: "remaxauth1.appspot.com",
//   messagingSenderId: "490421642543",
//   appId: "1:490421642543:web:5be83e5291323ac18badda"
// };



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5qmbhlXvmATFuh8meUsQ446apIQav6ho",
  authDomain: "oneremax-3412d.firebaseapp.com",
  projectId: "oneremax-3412d",
  storageBucket: "oneremax-3412d.appspot.com",
  messagingSenderId: "488078813594",
  appId: "1:488078813594:web:3c5d98034672908cc1b223"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {db, auth, storage}
