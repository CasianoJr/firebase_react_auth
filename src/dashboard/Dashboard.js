import React from "react";
import { Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import PostList from "../post/PostList";
export default function Dashboard() {
   return (
      <div className="mx-auto">
         <Jumbotron>
            <div className="col-sm-8 text-center mx-auto h4">
               Please take 5 seconds to login to access everything.
            </div>
            <div className="lead text-justify col-sm-10 mx-auto mb-5">
               This website is under development. In this website you can create a diary
               in the <Link to="/posts">Home</Link> page. Existing post by all the users
               are provided below and below the home page. You can also view the detail of
               the post by following the "View" link. Also, you can preform delete and
               update if you are the author of the post. You are not allowed to access
               some page if you are not authenticate.
               <p className="d-flex justify-content-end">- casiano_fernandez@gmail.com</p>
            </div>
         </Jumbotron>
         <PostList />
      </div>
   );
}
