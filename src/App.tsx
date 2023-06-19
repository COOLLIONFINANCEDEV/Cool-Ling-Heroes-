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
import {
  CheckUser,
  DisalbeUpdating,
  selectLogin,
} from "./Toolkit/Login/LoginSlice";
import routes from "./Router/routes";
import ApiSession from "./Service/ApiSession";
import { dehashValue, hashValue } from "./Helpers/Hash/HashValue";
import isExpired from "./Helpers/IsExpired";

function App() {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(true);
  const { isAuthenticated, user, isUpdating } = useSelector(selectLogin);
  const location = useLocation();

  // Here it's the First Auto Loader
  React.useEffect(() => {
    // window.addEventListener("load", (event) => {
    //   dispatch(deleteLoader({ key: "Loader" }));
    //   setVisible(true);
    // });
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(CheckUser({}));
  });

  const handleRefresh = React.useCallback(async () => {
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
        dispatch(DisalbeUpdating({}));
        dispatch(CheckUser({}));
      }
    }
  }, [dispatch]);

  // Here it's for refresh token
  React.useEffect(() => {
    const checkInspiredKey = setInterval(() => {
      if ((isExpired(user.exp, user.iat) && isAuthenticated) || isUpdating) {
        handleRefresh();
      }
    }, 5000);

    return () => clearInterval(checkInspiredKey);
  }, [handleRefresh, isAuthenticated, isUpdating, user]);

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
