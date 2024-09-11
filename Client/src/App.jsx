import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Clients  from "./Pages/Clients";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { Toaster } from "react-hot-toast";
import Loans from "./Pages/Loans";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
             <Route  path = "/c" element = {<Signin/>}/>
             <Route  path = "/signup" element = {<Signup/>}/>

             <Route path = "/" element = {<Clients/>}/>
             <Route path = "/loans/:clientId" element = {<Loans/>}/>
          </Route>
        </Routes>
        <Toaster position="top-center" reverseOrder={true} />
      </BrowserRouter>
    </>
  );
}

export default App;
