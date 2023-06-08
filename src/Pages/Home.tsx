import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Containers/NavBar";
import Footer from "../Containers/Footer";
import Loader from "../Toolkit/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { deleteLoader } from "../Toolkit/Loader/LoaderSlice";
import ScrollToHashElement from "../Helpers/ScrollToHashElement";
import AlertCustomize from "../Toolkit/Alert/AlertCustomze";
import PoppuContext from "../Toolkit/Poppu/PoppuCustomize";
import { CheckUser, selectLogin } from "../Toolkit/Login/LoginSlice";
import routes from "../Router/routes";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const { refresh, isAuthenticated } = useSelector(selectLogin);
  const location = useLocation();

  // Here it's the First Auto Loader
  React.useEffect(() => {
    window.addEventListener("load", (event) => {
      setTimeout(() => {
        dispatch(deleteLoader({ key: "Loader" }));
        setVisible(true);
      }, 2000);
    });
  }, [dispatch]);
  dispatch(CheckUser({}));

  // Here it's for refresh token
  React.useEffect(() => {
    if (refresh) {
    }
  }, [refresh]);

  // Here it's for is the use is auth the url is dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      if (!location.pathname.includes(routes.dashboard)) {
        window.location.pathname = routes.dashboard;
      }
    }
  }, [isAuthenticated, location]);
  return (
    <>
      <Loader />
      <ScrollToHashElement />
      <AlertCustomize />
      <PoppuContext />
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
