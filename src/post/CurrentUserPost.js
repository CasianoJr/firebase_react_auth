import React, { useEffect, useState } from "react";
import { useAuth } from "../authentication/AuthProvider";
import { useDataBase } from "../shared/DataBaseProvider";
import ListView from "./ListView";

export default function CurrentUserPost() {
   const [postList, setPostList] = useState();
   const { currentUser } = useAuth();
   const { retriveCurrentUserPosts, setError } = useDataBase();
   const path = `/Post/${currentUser.uid}`;
   const successFn = (snapshot) => {
      const data = snapshot.val();
      const articles = [];
      for (let postKey in data) {
         articles.push({ postKey, ...data[postKey] });
      }
      setPostList(articles);
   };
   useEffect(() => {
      const errorFn = () => {
         setError("Fail to fetch data!");
      };
      retriveCurrentUserPosts(path, successFn, errorFn);
   }, [retriveCurrentUserPosts, setError, path]);

   const handleDate = (timestamp) => {
      let d = new Date(timestamp);
      return d.toLocaleString("en-US");
   };

   return (
      <>
         <div className="h4 my-2 text-center">Viewing an author's post.</div>
         <ListView postList={postList} handleDate={handleDate} />{" "}
      </>
   );
}
