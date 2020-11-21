import React from "react";
import Dashboard from "../dashboard/Dashboard";
import Signup from "../authentication/Signup";
import Login from "../authentication/Login";
import PageNotFound from "../web404/PageNotFound";
import { Switch, Route } from "react-router-dom";
import { RoutesLoginRequired } from "./RoutesCheck";
import ForgotPassword from "../authentication/ForgotPassword";
import UpdateProfile from "../authentication/UpdateProfile";

export default function Routes() {
   return (
      <Switch>
         <RoutesLoginRequired exact path="/" component={Dashboard} />
         <Route path="/signup" component={Signup} />
         <Route path="/login" component={Login} />
         <Route path="/forgot_password" component={ForgotPassword} />
         <RoutesLoginRequired path="/update_profile" component={UpdateProfile} />
         <Route path="/" component={PageNotFound} />
      </Switch>
   );
}
