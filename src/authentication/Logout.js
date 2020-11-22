import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Alert } from "react-bootstrap";

export default function Logout(props) {
   const history = useHistory();
   const [error, setError] = useState();
   const { logout } = useAuth();
   const handleLogout = async () => {
      setError("");
      try {
         await logout();
         history.push("/login");
      } catch (err) {
         console.log(err.code);
         setError(err.message);
      }
   };
   return (
      <>
         {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
               {error}
            </Alert>
         )}
         <div {...props} onClick={handleLogout}>
            {props.children}
         </div>
      </>
   );
}
