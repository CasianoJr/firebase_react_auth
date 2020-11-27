import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../authentication/AuthProvider";
import { useDataBase } from "../shared/DataBaseProvider";

export default function PostDelete({ postId, post, ...rest }) {
   const { currentUser } = useAuth();
   const { deletePost, setError } = useDataBase();
   const history = useHistory();
   const handleDelete = () => {
      const path = `/Post/${currentUser.uid}`;
      if (currentUser.uid === post.authorId) {
         deletePost(path, postId);
         if (window.location.href.includes(postId)) {
            history.push("/posts");
         }
      } else {
         setError("You're not the author of this post, fail to delete.");
      }
   };
   return (
      <>
         {currentUser && currentUser.uid === post.authorId && (
            <span {...rest} onClick={handleDelete}>
               Delete
            </span>
         )}
      </>
   );
}
