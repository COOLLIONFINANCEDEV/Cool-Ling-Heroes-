import React from "react";
import Router from "./Router/router";
import "./App.css";
import { useLocation } from "react-router-dom";
import Loader from "./Toolkit/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { deleteLoader } from "./Toolkit/Loader/LoaderSlice";
import ScrollToHashElement from "./Helpers/ScrollToHashElement";
import AlertCustomize from "./Toolkit/Alert/AlertCustomze";
import PoppuContext from "./Toolkit/Poppu/PoppuCustomize";
import { CheckUser, selectLogin } from "./Toolkit/Login/LoginSlice";
import routes from "./Router/routes";
import ApiSession from "./Service/ApiSession";
import { dehashValue, hashValue } from "./Helpers/Hash/HashValue";

function App() {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const { isAuthenticated, user } = useSelector(selectLogin);
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

  const handleRefresh = async () => {
    const accessToken =
      dehashValue(localStorage.getItem("accessToken") ?? "") ?? "";
    const refreshToken =
      dehashValue(localStorage.getItem("refreshToken") ?? "") ?? "";

    const response = await ApiSession.auth.RefreshToken({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (!response.error) {
      const accessToken = hashValue(response.data[0].access_token);
      const refreshToken = hashValue(response.data[0].refresh_token);

      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
    }
  };

  // Here it's for refresh token
  React.useEffect(() => {
    if (new Date(user.exp) <= new Date(user.iat) && isAuthenticated) {
      alert('l')
      handleRefresh();
    }
  }, [isAuthenticated, user]);

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
          <Router />
        </>
      )}
    </>
  );
}

export default App;
