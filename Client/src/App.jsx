import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Clients  from "./Pages/Clients";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { Toaster } from "react-hot-toast";
import PaymentPage from "./Pages/PaymentPage";
import LoanPage from "./Pages/LoanPage";



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
             <Route  path = "/" element = {<Signin/>}/>
             <Route  path = "/signup" element = {<Signup/>}/>
           

             <Route path = "/clients" element = {<Clients/>}/>
             <Route path = "/loans" element = {<LoanPage/>}/>
             <Route path="/payments/:loanId" component = {<PaymentPage />} />
          </Route>
        </Routes>
        <Toaster position="top-center" reverseOrder={true} />
      </BrowserRouter>
    </>
  );
}

export default App;
