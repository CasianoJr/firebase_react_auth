import React, { createContext, useContext, useState } from "react";
import { firebaseDB } from "../firebase";

const DatBaseContext = createContext(null);

export function useDataBase() {
   return useContext(DatBaseContext);
}

export default function DataBaseProvider(props) {
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");

   const createPost = (path, post, callBack) => {
      return firebaseDB.ref(path).push(post, callBack);
   };
   const updatePost = (path, post, callBack) => {
      return firebaseDB.ref(path).update(post, callBack);
   };

   const createUserInDB = (path, user, callBack) => {
      return firebaseDB.ref(path).push(user, callBack);
   };
   const retrivePosts = (path, successFunction, errorFunction) => {
      return firebaseDB.ref(path).on("value", successFunction, errorFunction);
   };
   const retriveCurrentUserPosts = (path, successFunction, errorFunction) => {
      return firebaseDB.ref(path).on("value", successFunction, errorFunction);
   };

   const detailPost = (postId, path, successFunction, errorFunction) => {
      return firebaseDB
         .ref(path)
         .child(postId)
         .once("value")
         .then(successFunction, errorFunction);
   };

   const deletePost = (path, postID) => {
      firebaseDB.ref(path).child(postID).remove();
   };

   const value = {
      message,
      error,
      setMessage,
      setError,
      createPost,
      detailPost,
      retrivePosts,
      deletePost,
      retriveCurrentUserPosts,
      createUserInDB,
      updatePost,
   };
   return (
      <DatBaseContext.Provider value={value}>{props.children}</DatBaseContext.Provider>
   );
}
