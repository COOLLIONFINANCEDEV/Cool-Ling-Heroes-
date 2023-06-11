import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import Home from "../Pages/Home";
import Login from "../Containers/Login";
import NotFound from "../Pages/NotFound";
import Landing from "../Containers/Landing";
import Dashboard from "../Pages/Dashboard";
import OverView from "../Pages/OverView";

const Router = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />}>
        <Route path={routes.home} element={<Landing />} />
        <Route path={routes.login} element={<Login />} />
      </Route>
      <Route path={routes.dashboard} element={<Dashboard />}>
        <Route path={routes.dashboard} element={<OverView />} />
      </Route>

      <Route path={routes.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default Router;
