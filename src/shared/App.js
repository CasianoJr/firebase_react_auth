import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../authentication/AuthProvider";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import DataBaseProvider from "./DataBaseProvider";
import AlertMessage from "./AlertMessage";

function App() {
   return (
      <div>
         <BrowserRouter>
            <AuthProvider>
               <DataBaseProvider>
                  <NavBar />
                  <AlertMessage />
                  <Routes />
               </DataBaseProvider>
            </AuthProvider>
         </BrowserRouter>
      </div>
   );
}

export default App;
