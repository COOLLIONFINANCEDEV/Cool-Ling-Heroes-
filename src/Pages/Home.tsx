import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Containers/NavBar";
import Footer from "../Containers/Footer";
import Loader from "../Toolkit/Loader/Loader";
import { useDispatch } from "react-redux";
import { deleteLoader } from "../Toolkit/Loader/LoaderSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("load", (event) => {
      setTimeout(() => {
        dispatch(deleteLoader({ key: "Loader" }));
        setVisible(true);
      }, 2000);
    });
  }, [dispatch]);
  return (
    <>
      <Loader />
      {visible && (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
