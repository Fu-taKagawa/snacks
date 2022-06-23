import  firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDYf_qjWH1MMDHEZh9P0p8i1HkadeluPNo",
    authDomain: "snack-project-4363f.firebaseapp.com",
    projectId: "snack-project-4363f",
    storageBucket: "snack-project-4363f.appspot.com",
    messagingSenderId: "163034626130",
    appId: "1:163034626130:web:f4d33aa6556680a05d078b",
    measurementId: "G-160CYCPYNV"
};


firebase.initializeApp(firebaseConfig)


export const storage = firebase.storage;
export default firebase 
