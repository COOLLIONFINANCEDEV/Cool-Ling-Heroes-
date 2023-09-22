import React, { useState } from "react";
import NotFound from "../Pages/NotFound";
import { useSelector } from "react-redux";
import { selectLogin } from "../Toolkit/Login/LoginSlice";
import Roles from "../Seeds/Roles";

type Props = {
  allowedRole: string;
  children: any;
};

const RequireAuth: React.FC<Props> = ({ allowedRole, children }) => {
  const loginState = useSelector(selectLogin);
  const [role, setRole] = useState(Roles.donator);
  React.useEffect(() => {
    const isAuthenticated = loginState.isAuthenticated;
    if (isAuthenticated) {
      const userRole = loginState.user.role;
      setRole(userRole);
    } else {
      setRole(Roles.donator);
    }
  }, [loginState, role]);

  return <>{allowedRole === role ? children : <NotFound />}</>;
};

export default RequireAuth;
