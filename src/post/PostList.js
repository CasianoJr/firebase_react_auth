import React, { useEffect, useState } from "react";

import { useDataBase } from "../shared/DataBaseProvider";
import ListView from "./ListView";

export default function PostList() {
   const [postList, setPostList] = useState();
   const { retrivePosts, setError } = useDataBase();
   const path = "Post";
   const successFn = (snapshot) => {
      const data = snapshot.val();
      const postList = [];
      for (let authorKey in data) {
         for (let postKey in data[authorKey]) {
            postList.push({ postKey, ...data[authorKey][postKey] });
         }
      }
      setPostList(postList);
   };
   useEffect(() => {
      const errorFn = () => {
         setError("Fail to fetch data!");
      };
      retrivePosts(path, successFn, errorFn);
   }, [retrivePosts, setError]);

   const handleDate = (timestamp) => {
      let d = new Date(timestamp);
      return d.toLocaleString("en-US");
   };

   return <ListView postList={postList} handleDate={handleDate} />;
}
