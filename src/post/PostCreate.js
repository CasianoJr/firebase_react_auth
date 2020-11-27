import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../authentication/AuthProvider";
import { useDataBase } from "../shared/DataBaseProvider";
import faker from "faker";
import useStateCallback from "./useStateCallback";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

export default function PostCreate() {
   const history = useHistory();
   const { createPost, setError, setMessage } = useDataBase();
   const { currentUser } = useAuth();
   const [, setPost] = useStateCallback({});
   const [fakerData, setFakerData] = useState({});
   const titleRef = useRef();
   const contentRef = useRef();
   const generateFakeData = () => {
      setFakerData({ title: faker.lorem.sentence(), content: faker.lorem.paragraph() });
   };
   const handleError = (err) => {
      if (err) {
         setError(err);
      } else {
         setMessage(`Post is successfully created!`);
         history.push("/posts");
      }
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      const path = `/Post/${currentUser.uid}`;
      setPost(
         {
            title: titleRef.current.value,
            content: contentRef.current.value,
            authorId: currentUser.uid,
            image: faker.image.image(),
            dateAdded: firebase.database.ServerValue.TIMESTAMP,
         },
         (post) => {
            createPost(path, post, handleError);
         }
      );
   };

   return (
      <div className="col-lg-6 col-md-8 col-sm-10 mx-auto pt-5">
         <Button className="ml-auto d-block" onClick={generateFakeData}>
            Generate Fake Data
         </Button>
         <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
               <Form.Label>Title:</Form.Label>
               <Form.Control
                  ref={titleRef}
                  defaultValue={fakerData.title}
                  type="text"
                  placeholder="Title"
                  required
               />
            </Form.Group>
            <Form.Group controlId="post">
               <Form.Label>Content:</Form.Label>
               <Form.Control
                  ref={contentRef}
                  defaultValue={fakerData.content}
                  as="textarea"
                  rows={4}
                  placeholder="Enter text here"
                  required
               />
            </Form.Group>
            <Button variant="success" type="submit">
               Submit
            </Button>
         </Form>
      </div>
   );
}
