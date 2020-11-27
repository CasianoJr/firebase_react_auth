import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
   apiKey: "AIzaSyBFMKB8ARIVpdKbh2DGZkPXJuMyZDd55k8",
   authDomain: "sharednotes-78fdc.firebaseapp.com",
   databaseURL: "https://sharednotes-78fdc.firebaseio.com",
   projectId: "sharednotes-78fdc",
   storageBucket: "sharednotes-78fdc.appspot.com",
   messagingSenderId: "230077310958",
   appId: "1:230077310958:web:3ad9d8ac318c3005fad0ff",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();
export const firebaseDB = firebaseApp.database();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebaseApp;
