import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import Home from "../Pages/Home";
import Login from "../Containers/Login";
import NotFound from "../Pages/NotFound";
import Landing from "../Containers/Landing";
import Dashboard from "../Pages/Dashboard";
import OverView from "../Pages/OverView";
import Account from "../Pages/Account";
import Settings from "../Pages/Settings";
import Customers from "../Pages/Customers";

const Router = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />}>
        <Route path={routes.home} element={<Landing />} />
        <Route path={routes.login} element={<Login />} />
      </Route>
      <Route path={routes.dashboard} element={<Dashboard />}>
        <Route index element={<OverView />} />
        <Route path={routes.account} element={<Account />} />
        <Route path={routes.setting} element={<Settings />} />
        <Route path={routes.customers} element={<Customers />} />
      </Route>

      <Route path={routes.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default Router;
