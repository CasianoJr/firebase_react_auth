import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../authentication/AuthProvider";
import Logout from "../authentication/Logout";

export default function NavBar() {
   const { currentUser } = useAuth();
   return (
      <div>
         <Navbar bg="dark" variant="dark" expand="md">
            <Link to="/">
               <Navbar.Brand>Shared Diary</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="mr-auto">
                  <Link to="/posts" className="nav-link">
                     Home
                  </Link>
               </Nav>
               <Nav className="ml-auto">
                  {currentUser ? (
                     <>
                        <Link to={`/posts/${currentUser.uid}/list`}>
                           <div className="nav-link">
                              {currentUser.displayName
                                 ? currentUser.displayName
                                 : currentUser.email}
                           </div>
                        </Link>
                        <Link to="/update_profile" className="nav-link">
                           Update Profile
                        </Link>
                        <Logout className="nav-link">Logout</Logout>
                     </>
                  ) : (
                     <>
                        <Link to="/login" className="nav-link">
                           Login
                        </Link>
                        <Link to="/signup" className="nav-link">
                           Signup
                        </Link>
                     </>
                  )}
               </Nav>
            </Navbar.Collapse>
         </Navbar>
      </div>
   );
}
