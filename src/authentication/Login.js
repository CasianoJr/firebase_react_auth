import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function Login() {
   const emailRef = useRef();
   const passwordRef = useRef();
   const { login, loginGoogle } = useAuth();
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const history = useHistory();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         setError("");
         await login(emailRef.current.value, passwordRef.current.value);
         history.push("/");
      } catch (err) {
         console.log(err.code);
         setError(err.message);
      }
      setLoading(false);
   };
   const handleGoogleLogin = async () => {
      setLoading(true);
      try {
         setError("");
         await loginGoogle();
         history.push("/");
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
                  <div className="h2 text-center mb-4">Login</div>
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
                     <Button
                        disabled={loading}
                        type="submit"
                        className="w-100 btn-success"
                     >
                        Login
                     </Button>
                     <div className="text-center pt-2">
                        <Button variant="dark" onClick={handleGoogleLogin}>
                           Login
                           <img
                              src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                              alt="with google"
                              height="20"
                              width="20"
                           ></img>
                        </Button>
                     </div>
                  </Form>
                  <div className="text-center my-2">
                     <Link to="/forgot_password">Forgot Password?</Link>
                  </div>
               </Card.Body>
            </Card>
            <div className="text-muted small mx-2">
               Do not have an account? <Link to="/signup">Click Register</Link>
            </div>
         </div>
      </>
   );
}
