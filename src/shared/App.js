import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../authentication/AuthProvider";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import DataBaseProvider from "./DataBaseProvider";
import AlertMessage from "./AlertMessage";
import FlashMessage from "./FlashMessage";

function App() {
   return (
      <div>
         <BrowserRouter>
            <AuthProvider>
               <DataBaseProvider>
                  <NavBar />
                  <FlashMessage />
                  <AlertMessage />
                  <Routes />
               </DataBaseProvider>
            </AuthProvider>
         </BrowserRouter>
      </div>
   );
}

export default App;
