import firebase from "firebase/app";

import "firebase/auth";
import 'firebase/database';

const firebaseConfig={
    apiKey: "AIzaSyBeobVKhnMbqiJukzoyX12tVYJwa0cwMHw",
    authDomain: "seuimovel-2b042.firebaseapp.com",
    projectId: "seuimovel-2b042",
    storageBucket: "seuimovel-2b042.appspot.com",
    messagingSenderId: "467362086277",
    appId: "1:467362086277:web:3a72619031ab29b87f58ec"
}

 
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig)
console.log(firebase.app().name);  // "[DEFAULT]"
}

export const auth = firebase.auth();

export const database = firebase.database();