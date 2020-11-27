import React, { useState, useEffect } from "react";
import { useDataBase } from "../shared/DataBaseProvider";
import PostDelete from "./PostDelete";
import { Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../authentication/AuthProvider";

export default function PostDetail(props) {
   const { currentUser } = useAuth();
   const { setError, detailPost } = useDataBase();
   const postId = props.match.params.postId;
   const authorId = props.match.params.authorId;
   const [post, setPost] = useState();
   const path = `Post/${authorId}`;

   useEffect(() => {
      const errorFn = (err) => {
         setError("Fail to fetch data! ");
         console.log(err);
      };
      const successFn = (snapshot) => {
         const data = snapshot.val();
         setPost(data);
      };
      detailPost(postId, path, successFn, errorFn);
   }, [detailPost, postId, path, setError]);
   const handleDate = (timestamp) => {
      let d = new Date(timestamp);
      return d.toLocaleString("en-US");
   };

   return (
      <div>
         {post ? (
            <div className="col-lg-8 mx-auto mt-5">
               <Card>
                  <Card.Body>
                     <Card.Title>{post.title}</Card.Title>
                     <div className="pb-2 small text-muted">
                        {handleDate(post.dateAdded)}
                     </div>
                     <Card.Img
                        src={post.image}
                        className="img-fluid mx-auto d-block w-50"
                     />
                     <Card.Text>{post.content}</Card.Text>
                     {post.authorId === currentUser.uid && (
                        <Link
                           className="btn btn-outline-primary mx-2"
                           to={`/posts/${post.authorId}/${postId}/update`}
                        >
                           Update
                        </Link>
                     )}
                     <PostDelete
                        className="btn btn-outline-danger"
                        post={post}
                        postId={postId}
                     />
                  </Card.Body>
               </Card>
            </div>
         ) : (
            <div className="pt-5 text-center">
               <Spinner animation="border" variant="success" />
            </div>
         )}
      </div>
   );
}
