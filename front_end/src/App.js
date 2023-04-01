import React from "react";
import Home from "./container/Home";

import Login from "./Form/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <>

      <BrowserRouter>


        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
