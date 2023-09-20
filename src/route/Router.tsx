import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NoMatch";
import Home from "../pages/home";

const Router = () => {
  return (
    <Routes>
      <Route>
      <Route path='/' element={<Home />} />
      <Route path='/not-found' element={<NotFound />} />
      </Route>
    </Routes>

  );
};

export default Router;
