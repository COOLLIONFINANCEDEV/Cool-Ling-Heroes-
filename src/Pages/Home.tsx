import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Containers/NavBar";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />      
      <Outlet />
    </>
  );
};

export default Home;
