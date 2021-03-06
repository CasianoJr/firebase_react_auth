import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDataBase } from "../shared/DataBaseProvider";
import { useAuth } from "./AuthProvider";

export default function Signup() {
   const { currentUser } = useAuth();
   const { createUserInDB } = useDataBase();
   const emailRef = useRef();
   const passwordRef = useRef();
   const passwordConfirmRef = useRef();
   const { signup } = useAuth();
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const history = useHistory();

   const userDB = async (authUser) => {
      const field = authUser.user;
      const path = `Users`;
      const user = {
         email: field.email,
         displayName: field.displayName,
         phoneNumber: field.phoneNumber,
         uid: field.uid,
      };
      try {
         await createUserInDB(path, user);
      } catch (err) {
         console.log(err);
      }
   };
   if (currentUser) {
      history.push("/");
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
         return setError("Password do not match!");
      }
      try {
         setError("");
         setLoading(true);
         await signup(emailRef.current.value, passwordRef.current.value).then(userDB);
      } catch (err) {
         console.log(err.code);
         setError(err.message);
      }
      setLoading(false);
   };
   return (
      <>
         <div className="col-lg-4 col-md-6 col-sm-8 col mx-auto pt-5">
            <Card>
               <Card.Body>
                  <div className="h2 text-center mb-4">Sign Up</div>
                  {error && (
                     <Alert variant="danger" onClose={() => setError("")} dismissible>
                        {error}
                     </Alert>
                  )}
                  <Form onSubmit={handleSubmit}>
                     <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                     </Form.Group>
                     <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                           type="password"
                           ref={passwordRef}
                           required
                           autoComplete="false"
                        />
                     </Form.Group>
                     <Form.Group id="password-confirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                           type="password"
                           ref={passwordConfirmRef}
                           required
                           autoComplete="false"
                        />
                     </Form.Group>
                     <Button
                        disabled={loading}
                        type="submit"
                        className="w-100 btn-primary"
                     >
                        Register
                     </Button>
                  </Form>
               </Card.Body>
            </Card>
            <div className="text-muted small mx-2">
               Already have an account? <Link to="/login">Click Login</Link>
            </div>
         </div>
      </>
   );
}
