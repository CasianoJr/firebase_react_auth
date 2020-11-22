import React, { useContext, useEffect, createContext, useState } from "react";
import { firebaseAuth } from "../firebase";
const AuthContext = createContext(null);

export function useAuth() {
   return useContext(AuthContext);
}

export function AuthProvider(props) {
   const [currentUser, setCurrentUser] = useState(null);
   const [loading, setLoading] = useState(true);

   const signup = (email, password) => {
      return firebaseAuth.createUserWithEmailAndPassword(email, password);
   };
   const login = (email, password) => {
      return firebaseAuth.signInWithEmailAndPassword(email, password);
   };
   const logout = () => {
      return firebaseAuth.signOut().then(() => setCurrentUser(null));
   };
   const resetPassword = (email) => {
      return firebaseAuth.sendPasswordResetEmail(email);
   };
   const updateEmail = (email) => {
      return currentUser.updateEmail(email);
   };
   const updatePassword = (password) => {
      return currentUser.updatePassword(password);
   };

   useEffect(() => {
      const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
         if (user) {
            setCurrentUser(user);
         }
         setLoading(false);
      });
      return () => {
         unsubscribe();
      };
   }, []);

   const value = {
      currentUser,
      signup,
      login,
      logout,
      resetPassword,
      updateEmail,
      updatePassword,
   };

   return (
      <AuthContext.Provider value={value}>
         {!loading && props.children}
      </AuthContext.Provider>
   );
}
