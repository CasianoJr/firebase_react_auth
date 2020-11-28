import React from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import PostDelete from "./PostDelete";

export default function ListView({ postList, handleDate }) {
   return (
      <div>
         <div className="mx-auto col-sm-10">
            {postList ? (
               postList.map((post, idx) => (
                  <div key={idx} className="card my-2">
                     <div className="card-body">
                        <div className="card-title">{post.title}</div>
                        <img
                           src={post.image}
                           alt="random"
                           className="float-right"
                           width="150"
                        />
                        <div className="mx-2 mt-0">
                           <Link to={`/posts/${post.authorId}/list`}>
                              <div className="text-muted small">
                                 Author: {post.authorName}
                              </div>
                           </Link>
                           <div className="small text-muted">
                              Dated: {handleDate(post.dateAdded)}
                           </div>
                        </div>
                        <div className="card-text">{post.content}</div>

                        <div className="pl-lg-5 ml-lg-5">
                           <Link
                              className="btn btn-outline-primary mx-2"
                              to={`/posts/${post.authorId}/${post.postKey}/detail`}
                           >
                              View Detail
                           </Link>
                           <PostDelete
                              className="btn btn-outline-danger"
                              post={post}
                              postId={post.postKey}
                           />
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <div className="pt-5 text-center">
                  <Spinner animation="border" variant="success" />
               </div>
            )}
         </div>
      </div>
   );
}
