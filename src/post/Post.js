import React from "react";
import { Link } from "react-router-dom";
import PostList from "./PostList";

export default function Post() {
   return (
      <div>
         <Link className="btn mx-5 border d-block" to="/posts/create">
            Create
         </Link>
         <PostList />
      </div>
   );
}
