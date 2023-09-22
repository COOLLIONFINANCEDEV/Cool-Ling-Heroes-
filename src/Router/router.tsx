import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';
import Landing from '../Containers/Landing';
import Dashboard from '../Pages/Dashboard';
import OverView from '../Pages/OverView';
import Account from '../Pages/Account';
import Settings from '../Pages/Settings';
import Customers from '../Pages/Customers';
import { useSelector } from 'react-redux';
import { selectLogin } from '../Toolkit/Login/LoginSlice';
import RequireAuth from '../Helpers/RequireAuth';
import Roles from '../Seeds/Roles';
import Maturity from '../Pages/Maturity';
import Messenger from '../Pages/Messenger';
import Products from '../Pages/Products';
import Donateurs from '../Pages/Donor';
import Beneficiaire from '../Pages/Beneficiaires';
import Requests from '../Pages/Requests';

const Router = () => {
  const { isAuthenticated, user } = useSelector(selectLogin);
  return (
    <Routes>
      {!isAuthenticated && (
        <>
          <Route path={routes.home} element={<Home />}>
            <Route path={routes.home} element={<Landing />} />
          </Route>
          <Route path={routes.login} element={<Login />}></Route>
        </>
      )}

      {isAuthenticated && (
        <Route path={routes.dashboard} element={<Dashboard />}>
          {/* <Route index element={<OverViewDash />} /> */}
          <Route
            path={routes.product}
            element={
              <RequireAuth allowedRole={Roles.admin}>
                <Products />
              </RequireAuth>
            }
          />
          <Route index element={<OverView />} />
          <Route path={routes.account} element={<Account />} />
          <Route path={routes.setting} element={<Settings />} />
          <Route path={routes.messenger} element={<Messenger />} />
          <Route
            path={routes.donor}
            element={
              <RequireAuth allowedRole={Roles.admin}>
                <Donateurs />
              </RequireAuth>
            }
          />{' '}
          <Route
            path={routes.beneficiary}
            element={
              <RequireAuth allowedRole={Roles.admin}>
                <Beneficiaire />
              </RequireAuth>
            }
          />
          <Route
            path={routes.request}
            element={
              <RequireAuth allowedRole={Roles.admin}>
                <Requests />
              </RequireAuth>
            }
          />
        </Route>
      )}

      <Route path={routes.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default Router;
