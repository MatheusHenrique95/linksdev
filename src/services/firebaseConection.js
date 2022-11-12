
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyD5KHt2TZYDVWWFqlt2bDMhNQuHLTGF9vc",
  authDomain: "mylinks-e1a89.firebaseapp.com",
  projectId: "mylinks-e1a89",
  storageBucket: "mylinks-e1a89.appspot.com",
  messagingSenderId: "879809182760",
  appId: "1:879809182760:web:ea1da2d401e39bd487491d",
  measurementId: "G-XX68BWT3YQ"
};

const firebaseapp = initializeApp(firebaseConfig)
const bd = getFirestore(firebaseapp)
const auth = getAuth(firebaseapp)

export{ bd, auth}