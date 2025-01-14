import {initializeApp} from 'firebase/app';
import { getAuth,createUserWithEmailAndPassword,updateProfile,signOut } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBoLL3VJBp-cAYhGL08cXpxyCHv0sgrcAE",
    authDomain: "stademo2022.firebaseapp.com",
    projectId: "stademo2022",
    storageBucket: "stademo2022.appspot.com",
    messagingSenderId: "267963995076",
    appId: "1:267963995076:web:3bbd1f82b72f95d5bc4a91",
    measurementId: "G-H164QGCE13"
  };

  //init firebase

  const app=initializeApp(firebaseConfig)

  //init service 

  const projectFirestore= getFirestore(app)
  const projectAuth= getAuth(app)

  export{projectFirestore,projectAuth,createUserWithEmailAndPassword,updateProfile,signOut}
