import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Clients } from "./Pages/Clients";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route  path = "/" element = {<Clients/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
