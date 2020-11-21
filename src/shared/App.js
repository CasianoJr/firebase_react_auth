import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../authentication/AuthProvider";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";

function App() {
   return (
      <div>
         <BrowserRouter>
            <AuthProvider>
               <NavBar />
               <Routes />
            </AuthProvider>
         </BrowserRouter>
      </div>
   );
}

export default App;
