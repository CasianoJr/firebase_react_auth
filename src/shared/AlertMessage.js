import React from "react";
import { Alert } from "react-bootstrap";
import { useDataBase } from "./DataBaseProvider";

export default function AlertMessage() {
   const { error, message, setError, setMessage } = useDataBase();
   return (
      <>
         {error && (
            <Alert
               variant="danger"
               className="col-md-7 mx-auto mt-1"
               onClose={() => setError("")}
               dismissible
            >
               {error}
            </Alert>
         )}
         {message && (
            <Alert
               variant="success"
               className="col-md-7 mx-auto mt-1"
               onClose={() => setMessage("")}
               dismissible
            >
               {message}
            </Alert>
         )}
      </>
   );
}
