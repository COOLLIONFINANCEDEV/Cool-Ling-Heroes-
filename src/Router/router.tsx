import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import Home from "../Pages/Home";
import Login from "../Containers/Login";
import NotFound from "../Pages/NotFound";
import Landing from "../Containers/Landing";
import Dashboard from "../Pages/Dashboard";
import OverView from "../Pages/OverView";

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Home />,
    children: [
      {
        path: routes.home,
        element: <Landing />,
      },
      {
        path: routes.login,
        element: <Login />,
      },
    ],
  },
  {
    path: routes.dashboard,
    element: <Dashboard />,
    children: [
      {
        path: routes.dashboard,
        element: <OverView />,
      },
    ],
  },
  {
    path: routes.notFound,
    element: <NotFound />,
  },
 
]);

export default router;
