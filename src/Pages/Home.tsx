import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Containers/NavBar";
import Footer from "../Containers/Footer";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
