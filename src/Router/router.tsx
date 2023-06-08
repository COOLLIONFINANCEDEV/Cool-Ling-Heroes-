import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import Home from "../Pages/Home";
import Login from "../Containers/Login";
import NotFound from "../Pages/NotFound";
import Landing from "../Containers/Landing";
import Dashboard from "../Pages/Dashboard";

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
    path: routes.notFound,
    element: <NotFound />,
  },
  {
    path: routes.dashboard,
    element: <Dashboard />,
  },
]);

export default router;
