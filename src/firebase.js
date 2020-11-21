import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyAyrin-aXWfs8nsSr5UvdaTUQ9-V0sC9HY",
   authDomain: "auth-development-a6759.firebaseapp.com",
   databaseURL: "https://auth-development-a6759.firebaseio.com",
   projectId: "auth-development-a6759",
   storageBucket: "auth-development-a6759.appspot.com",
   messagingSenderId: "94331314234",
   appId: "1:94331314234:web:f74372a26c1a2f8b491503",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();
export default firebaseApp;
