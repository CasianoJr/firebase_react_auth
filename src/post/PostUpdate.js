import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useAuth } from "../authentication/AuthProvider";
import { useDataBase } from "../shared/DataBaseProvider";
import firebase from "firebase/app";
import useStateCallback from "./useStateCallback";

import { useHistory } from "react-router-dom";

export default function PostUpdate(props) {
   const [post, setPost] = useState();
   const { updatePost, setMessage, setError, detailPost } = useDataBase();
   const postId = props.match.params.postId;
   const authorId = props.match.params.authorId;
   const history = useHistory();
   const { currentUser } = useAuth();
   const titleRef = useRef();
   const contentRef = useRef();
   const getPath = `Post/${authorId}`;
   const [, setPostForSubmit] = useStateCallback({});

   useEffect(() => {
      const errorFn = (err) => {
         setError("Fail to fetch data! ");
         console.log(err);
      };
      const successFn = (snapshot) => {
         const data = snapshot.val();
         setPost(data);
      };

      detailPost(postId, getPath, successFn, errorFn);
   }, [detailPost, postId, getPath, setError]);

   const handleError = (err) => {
      if (err) {
         setError(err);
      } else {
         setMessage(`Post is successfully updated!`);
         history.push(`/posts/${authorId}/${postId}/detail`);
      }
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      const updatePath = `/Post/${authorId}/${postId}`;
      if (currentUser.uid === authorId) {
         setPostForSubmit(
            {
               title: titleRef.current.value,
               content: contentRef.current.value,
               authorId: currentUser.uid,
               dateAdded: firebase.database.ServerValue.TIMESTAMP,
            },
            (post) => {
               updatePost(updatePath, post, handleError);
            }
         );
      } else {
         setError("Not allowed to update this post");
      }
   };

   return (
      <>
         {post ? (
            <div className="col-lg-6 col-md-8 col-sm-10 mx-auto pt-5">
               <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="title">
                     <Form.Label>Title:</Form.Label>
                     <Form.Control
                        ref={titleRef}
                        defaultValue={post.title}
                        type="text"
                        placeholder="Title"
                        required
                     />
                  </Form.Group>
                  <Form.Group controlId="post">
                     <Form.Label>Content:</Form.Label>
                     <Form.Control
                        ref={contentRef}
                        defaultValue={post.content}
                        as="textarea"
                        rows={4}
                        placeholder="Enter text here"
                        required
                     />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                     Update
                  </Button>
               </Form>
            </div>
         ) : (
            <div className="pt-5 text-center">
               <Spinner animation="border" variant="success" />
            </div>
         )}
      </>
   );
}
