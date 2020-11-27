import React from "react";
import Dashboard from "../dashboard/Dashboard";
import Signup from "../authentication/Signup";
import Login from "../authentication/Login";
import PageNotFound from "../web404/PageNotFound";
import { Switch, Route } from "react-router-dom";
import { RoutesLoginRequired, RoutesIsLoginAlready } from "./RoutesCheck";
import ForgotPassword from "../authentication/ForgotPassword";
import UpdateProfile from "../authentication/UpdateProfile";
import PostList from "../post/PostList";
import PostCreate from "../post/PostCreate";
import PostUpdate from "../post/PostUpdate";
import Post from "../post/Post";
import PostDetail from "../post/PostDetail";
import CurrentUserPost from "../post/CurrentUserPost";

export default function Routes() {
   return (
      <Switch>
         <Route exact path="/" component={Dashboard} />
         <RoutesLoginRequired exact path="/posts" component={Post} />
         <RoutesLoginRequired
            exact
            path="/posts/:authorId/:postId/detail"
            component={PostDetail}
         />
         <RoutesLoginRequired
            exact
            path="/posts/:authorId/:postId/update"
            component={PostUpdate}
         />
         <RoutesLoginRequired
            exact
            path="/posts/:authorId/list"
            component={CurrentUserPost}
         />
         <RoutesLoginRequired exact path="/posts/list" component={PostList} />
         <RoutesLoginRequired exact path="/posts/create" component={PostCreate} />
         <RoutesIsLoginAlready exact path="/signup" component={Signup} />
         <RoutesIsLoginAlready exact path="/login" component={Login} />
         <Route exact path="/forgot_password" component={ForgotPassword} />
         <RoutesLoginRequired exact path="/update_profile" component={UpdateProfile} />
         <Route path="/" component={PageNotFound} />
      </Switch>
   );
}
