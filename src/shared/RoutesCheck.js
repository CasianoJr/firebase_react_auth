import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../authentication/AuthProvider";
import { useDataBase } from "./DataBaseProvider";

export function RoutesLoginRequired({ component: Component, ...rest }) {
   const { currentUser } = useAuth();
   const { setError } = useDataBase();
   if (!currentUser) {
      setError("Please login to preform this action!");
   }
   return (
      <Route
         {...rest}
         render={(props) =>
            currentUser ? <Component {...props} /> : <Redirect exact to="/login" />
         }
      />
   );
}
export function RoutesIsLoginAlready({ component: Component, ...rest }) {
   const { currentUser } = useAuth();
   return (
      <Route
         {...rest}
         render={(props) => {
            return (
               <>{!currentUser ? <Component {...props} /> : <Redirect exact to="/" />}</>
            );
         }}
      />
   );
}
